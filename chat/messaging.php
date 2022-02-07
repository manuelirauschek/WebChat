<?php
require_once('response.php');
require_once('connection.php');
require_once('user.php');

global $pdo;

$data = $_GET;

switch($data['action']) {
    case 'receive': receiveMessages(); break;
    case 'send': sendMessage(); break;
}

function checkLoginCredentials() {
    global $pdo, $data;
    
    $userdb = new UserDatabase($pdo);
    $credentialsOK = $userdb->userLoginCredentialsOK($data['username'], $data['password']);
    
    if(!$credentialsOK) {
        setResponse('error', 'Incorrect login credentials');
    } else {
        return true;
    }
}
function sendMessage() {
    global $pdo, $data;

    if(checkLoginCredentials()) {
        $userdb = new UserDatabase($pdo);
        if($userdb->userJoinedGroup($data['username'], $data['group'])) {
            
            $statement = $pdo->prepare('INSERT INTO chat VALUES(:ip, :group, :username, :text, :ts)');

            $result = $statement->execute([
                'ip' => $_SERVER['REMOTE_ADDR'],
                'group' => $data['group'],
                'username' => $data['username'],
                'text' => $data['text'],
                'ts' => time()
            ]);
            if($result) {
                setResponse('success', 'Message sent');
            } else {
                setResponse('error', 'Could not send message', $data);
            }
        } else {
            setResponse('error', sprintf('You cannot send messages to "%s" group', $data['group']));
        }
    }
}
function receiveMessages() {
    global $pdo, $data;

    if(checkLoginCredentials()) {
        $userdb = new UserDatabase($pdo);
        if($userdb->userJoinedGroup($data['username'], $data['group'])) {
          
            if(!isset($data['whole'])) {
                // receive new messages
                $statement = $pdo->prepare('SELECT * FROM chat WHERE groupname = :group AND ts > :ts');
                $statement->execute([
                    'group' => $data['group'],
                    'ts' => time() - 30
                ]);
            } else {
                // receive whole messages
                $statement = $pdo->prepare('SELECT * FROM chat WHERE groupname = :group');
                $statement->execute([
                    'group' => $data['group']
                ]);
            }

            $chat = [];
            foreach($statement->fetchAll() as $message) {
                array_push($chat, [
                    'group' => $message['groupname'],
                    'username' => $message['username'],
                    'text' => $message['text'],
                    'ts' => $message['ts'],
                    'time' => date('d.m.Y : H:i', $message['ts'])
                ]);
            }
            die(json_encode($chat));
        } else {
            setResponse('error', sprintf('You cannot receive messages from "%s" group', $data['group']));
        }
        
    }
}
?>