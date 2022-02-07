<?php
function setResponse($type, $message, $data = null) {
    die(json_encode([
        'type'=>$type,
        'message'=>$message,
        'ts'=>time(),
        'data'=>$data != null ? json_encode($data) : null
    ]));
}
?>