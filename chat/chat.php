<?php
error_reporting(false);
session_start();

require_once('user.php');

?>
<html>
    <head>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" type="text/javascript"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <link rel="stylesheet" href="style.css">
        <style>
            @media only screen and (max-width: 576px) {
	            .tool-box {
		            display: block;
	            }
	            .tool-box .groups {
		            display: block;
	            }
	            .tool-box .close .btn {
		            margin-right: 20px;
		            float: right;
	            }
            }
        </style>
    </head>

    <script>
        const loginCredentials = {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password")
        };
    </script>
    
    <script src="js/request.js"></script>
    <script src="js/request_login_credentials.js"></script>
    <script src="js/misc.js"></script>

    <script>
            <?php 
                if(!$_SESSION['login']['success']) {
                    echo("requestLoginCredentials();");
                } else {
                    updateGroupsSession();
                    // js
                    ?>
                    loginCredentials.username = "<?php echo($_SESSION['login']['credentials']['username']); ?>";
                    loginCredentials.password = "<?php echo($_SESSION['login']['credentials']['password']); ?>";
                    console.log(loginCredentials);
                    <?php
                }
            ?>
    </script>

    <body>
        <div id="tool-bar" class="tool-bar">
            <button class="avatar-btn"><img src="images/user.png" width="32" height="32"></button>
            <div class="username"><?php echo($_SESSION['login']['credentials']['username']); ?></div>
            <select id="groups-dropdown" class="groups">
            <?php
                foreach($_SESSION['login']['joined_groups'] as $groupname) {
                    if(trim($groupname, ' ') != null) {
                        echo('<option value="'.$groupname.'">'.$groupname.'</option>');
                    }
                }
                ?>
            </select>
            <button id="show-tool-box-btn" class="show-tool-box-btn"><img src="images/down-arrow.png" width="16" height="16"></button>
        </div>
        <div id="tool-box" class="tool-box" style="transition: 0.8s; display: none">
            <div class="close">
                <button class="btn" onclick="closeToolBox()">
                    <img src="images/close.png" width="16" height="16">
                </button>
            </div>
            <div class="groups">
            <div class="group">
                <div>Erstelle eine Gruppe</div>
                <input class="name" type="text" id="group-name" name="group">
                <div id="create-group-response" class="response">
                    <?php
                        if(isset($_GET['group_created'])||isset($_GET['group_created_failed']))echo($_GET['message']);
                    ?>
                </div>
                <div>Benutzerliste:</div>
                    <table id="create-group-members" class="members">
                        <?php
                        foreach(getAllUsernames() as $username) {
                            $onclick = "addMemberToGroup('".$username."', this)";
                            echo('
                                <tr>
                                    <td><img src="images/user.png" width="18" height="18"></td>
                                    <td>'.$username.'</td>
                                    <td><button class="add-btn" onclick="'.$onclick.'">Einladen</td>
                                </tr>
                            ');
                        }
                        ?>
                    </table>
                    <button id="create-group-btn" class="create-btn">Erstellen</button>
                </div>
                <div class="group">
                    <div>Gruppen, in denen du bist</div>
                    <table class="joined-groups">
                    <?php
                        foreach($_SESSION['login']['joined_groups'] as $groupname) {
                            if(trim($groupname, ' ') != null) {
                                echo('
                                <tr>
                                    <td>'.$groupname.'</td>
                                    <td><button class="join-chat-btn" onclick="joinChat(this)" group-name="'.$groupname.'">Betreten</button></td>
                                    <td>
                                        <button class="remove-chat-btn" onclick="removeChat(this)" group-name="'.$groupname.'">
                                            <img src="images/close.png" width="16" height="16">
                                        </button>
                                    </td>
                                </tr>');
                            }
                        }
                    ?>
                    </table>
                </div>
            
        </div>
            </div>
        <div class="chat-window">
            
            <div id="chat-messages" class="chat-messages">

            </div>

            <div class="chat-controls">
                <div id="emojis" class="emojis" style="display: none">
                    <div id="emojis-nav" class="emojis-nav">
                        
                    </div>
                    <div id="emojis-list" class="emojis-list">

                    </div>
                </div>
                <div class="options">
                    <input type="text" id="message">
                    <button onclick="emojis.functions.toggleBoxVisbility()"><img src="images/emojis.png" width="25" height="25"></button>
                    <button onclick="send()"><img src="images/send.png" width="25" height="25"></button>
                </div>
            </div>
        </div>
    </body>
    <script src="js/messaging.js"></script>
    <script src="js/groupchat.js"></script>
    <script src="js/emojisbox.js"></script>
    <script>

        function closeToolBox() {
            $("#tool-bar").css({display: "flex"});
            $("#tool-box").css({display: "none"});
        }
        function joinChat(e) {
            startReceiver($(e).attr("group-name"), 1000);
        }
        document.addEventListener("DOMContentLoaded", function(e) {

            $("#message").on('keyup', function (e) {
                if (e.key === 'Enter' || e.keyCode === 13) {
                    send();
                }
            });

            $("#create-group-btn").click(function(e) {
                createGroupChat({
                    owner: loginCredentials.username,
                    groupname: $("#group-name").val(),
                    members: groupMembernames
                });
            });

            $("#show-tool-box-btn").click(function(e) {
                $("#tool-bar").css({display: "none"});
                $("#tool-box").css({display: "block"});
            });

            $("#groups-dropdown").change(function() {
                startReceiver($(this).val(), 1000);
            });

            // this is just for create-group-members table
            startReceiver("main", 1000);
        });
    </script>
</html>
