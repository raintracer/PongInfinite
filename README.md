# PongInfinite

// ---------- ASSIGN PLAYERS

1) [client] emit RequestPlayer --> send a request to the server to be assigned as a player
2) [server] once, each connection, RequestPlayer --> increment player count and emit the player number assignment
   when playerCount === 2 call Create() and move to STARTUP
3) [client] once AssignPlayer --> call assignPlayer() client side and assign the player number to the player variable

// ---------- STARTUP

1) [server] create objects executing Create() --> create paddles and ball(s) and call Preload()
2) [server] call Start() --> setInterval for Update THEN call randomizeBalls()

// --------- GAMEPLAY

Update (continuous setInterval, 60fps aka every 16.6ms)
1) [server] setInterval loop --> executes GameUpdate every 60frames (1000/60 ~ 16.6ms)
2) [server] GameUpdate() --> iterates through gameObjects and gathers new object data points
3) [server] emit GameShow() --> passes updated gameObjects data array back to client
4) [client] on GameShow() --> iterates through gameObjects array data and updates the clients' graphics

Collision
1) [server] detect collision --> gather collision object data
2) [server] emit Collision --> send sound / animation trigger to clients
3) [client] on Collision --> trigger sound / animation

Score
1) [server] detect point score --> gather point data
2) [server] emit updateScore --> send score data { topScore, bottomScore }
3) [client] on updateScore --> update the clients' score divs

Keypresses
1) [client] emit keyPress --> send keyPress data { player, key }
2) [server] on keyPress --> register keyPress movement and proceed back to GameUpdate
