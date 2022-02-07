<?php
session_start();

require_once('response.php');
require_once('connection.php');

global $pdo;

$data = count($_GET) > 0 ? $_GET : $_POST;

switch($data['action']) {
    case 'register_and_login': registerAndLogin(); break;
    case 'create_group_chat': createGroup(); break;
}

function registerAndLogin() {
    global $pdo, $data;

    $userdb = new UserDatabase($pdo);
    $userExists = $userdb->getUserData($data['username'], $data['password']);

    if($userExists) { // then try login
        $credentialsOK = $userdb->userLoginCredentialsOK($data['username'], $data['password']);
        if($credentialsOK) {
            setLoginSession();
            header('Location: chat.php');
        } else {
            setResponse('error', 'Incorrect login credentials');
        }
    } else { // then try register
        $registered = $userdb->registerUser($data['username'], $data['password']);
        if($registered) { // then login
            $credentialsOK = $userdb->userLoginCredentialsOK($data['username'], $data['password']);
            if($credentialsOK) {
                setLoginSession();
                header('Location: chat.php');    
            } else {
                setResponse('error', 'Incorrect login credentials after registration');
            }
        } else { // then print error
            setResponse('error', sprint('User %s could not be registered', $data['username']));
        }
    }
}

function getAllUsernames() {
    global $pdo;
    $userdb = new UserDatabase($pdo);
    $allUsers = $userdb->getAllUsers();
    $allUsernames = [];

    foreach($allUsers as $user) {
        array_push($allUsernames, $user['username']);
    }

    return $allUsernames;
}

function createGroup() {
    global $pdo, $data;

    $groupdb = new  GroupDatabase($pdo);
    $groupExists = $groupdb->getGroupData($data['groupname']);

    if($groupExists) {
        setResponse('error', sprintf('Group with name "%s" already exists', $data['groupname']));
    } else { // create group
        $created = $groupdb->createGroup($data['groupname'], $_SESSION['login']['credentials']['username'], $data['members']);
        if($created) {
            $members = explode(',', $data['members']);

            $userdb = new UserDatabase($pdo);

            $addedGroupResults = [];
            foreach($members as $membername) {
   
                $addedGroupResult = $userdb->addGroupToUser($membername, $data['groupname']);
                array_push($addedGroupResults, $addedGroupResult);
            }
            updateGroupsSession();
            header('Location: chat.php');
            // success message
        } else {
            setResponse('error', sprintf('Could not create Group "%s"', $data['groupname']));
        }
    }
}

function setLoginSession() {
    global $data;

    $_SESSION['login'] = [
        'success' => true,
        'credentials' => [
            'username' => $data['username'],
            'password' => $data['password']
        ]
    ];

    updateGroupsSession();
}

function updateGroupsSession() {
    global $pdo;
    $userdb = new UserDatabase($pdo);
    $_SESSION['login']['joined_groups'] = explode(',', $userdb->getGroupsFromUser($_SESSION['login']['credentials']['username']));
}


class UserDatabase {
    private $databaseHandle = null;

    function __construct($databaseHandle) {
        $this->databaseHandle = $databaseHandle;
    }

    function registerUser($username, $password) {
        $statement = $this->databaseHandle->prepare('INSERT INTO members VALUES(:username, :password, :registration_date, :level, :joined_groups)');
        $result = $statement->execute([
            'username' => $username,
            'password' => $password,
            'registration_date' => time(),
            'level' => 0,
            'joined_groups' => 'main'
        ]);
        return $result;
    }

    function userLoginCredentialsOK($username, $password) {
        $user = $this->getUserData($username);

        if($user['username'] == $username && $password == $user['password']) {
            return true;
        } else {
            return false;
        }
    }

    function getUserData($username) {
        $statement = $this->databaseHandle->prepare('SELECT * FROM members WHERE username = :username');
        $statement->execute(['username' => $username]);
        return $statement->fetch();
    }

    function getAllUsers() {
        $statement = $this->databaseHandle->prepare('SELECT * FROM members');
        $statement->execute();
        return $statement->fetchAll();
    }
    function getGroupsFromUser($username) {
        $statement = $this->databaseHandle->prepare('SELECT * FROM members WHERE username = :username');
        $statement->execute(['username' => $username]);
        return $statement->fetch()['joined_groups'];
    }

    function addGroupToUser($username, $groupname) {
        if(!$this->userJoinedGroup($username, $groupname)) {
            $statement = $this->databaseHandle->prepare('UPDATE members SET joined_groups = :joined_groups WHERE username = :username');
            $result = $statement->execute([
                'joined_groups' => $this->getGroupsFromUser($username).','.$groupname,
                'username' => $username
            ]);
            return $result;
        } else {
            return true;
        }
    }

    function userJoinedGroup($username, $groupname) {
        $groupsFromUser = explode(',', $this->getGroupsFromUser($username));
        return in_array($groupname, $groupsFromUser);
    }
}

class GroupDatabase {
    private $databaseHandle = null;

    function __construct($databaseHandle) {
        $this->databaseHandle = $databaseHandle;
    }

    function createGroup($groupname, $owner, $members) {
        $statement = $this->databaseHandle->prepare('INSERT INTO groups VALUES(:groupname, :owner, :members, :creation_date)');
        $result = $statement->execute([
            'groupname' => $groupname,
            'owner' => $owner,
            'members' => $members,
            'creation_date' => time()
        ]);
        return $result;
    }

    function getGroupData($groupname) {
        $statement = $this->databaseHandle->prepare('SELECT * FROM groups WHERE groupname = :groupname');
        $statement->execute(['groupname' => $groupname]);

        return $statement->fetch();
    }
}
?>