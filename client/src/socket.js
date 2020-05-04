import io from "socket.io-client";

export var socket;

socket = io.connect("/");
