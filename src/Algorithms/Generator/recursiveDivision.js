import {resetGrid, randomInteger, animateGeneration} from '../helpers';

export function computeRecursiveDivision(chamber, startNodeCoords, finishNodeCoords, generatedWallsInOrder){
    
    const min_chamber_size = 2;

    // If minimum chamber size is reached, return the generated walls
    if(chamber.length <= min_chamber_size && chamber[0].length <= min_chamber_size ){
        return generatedWallsInOrder;
    }

    // Create the outer walls
    if(generatedWallsInOrder.length === 0) {
        for(var row = 0; row < chamber.length; row++){
            for(var col = 0; col < chamber[0].length; col++){
                if(row === 0 || col === 0 || row === chamber.length - 1 || col === chamber[0].length - 1 ){
                    generatedWallsInOrder.push(chamber[row][col]);
                }
            }
        }
        chamber = chamber.slice(1, chamber.length - 1);
        for(var row = 0; row < chamber.length; row++){
            chamber[row] = chamber[row].slice(1, chamber[row].length - 1);
        }
    }

    // Divide chamber horizonally if the chamber is more tall than wide
    if(chamber.length > chamber[0].length){
        // Select a random row within the chamber to draw walls. 
        // Leave a one row space to prevent a double wall
        var wallLineRow = randomInteger(1, chamber.length - 2);
        // Leave leave a space at one random location along the wall line
        var entranceIdx = randomInteger(0, 1) === 0 ? 0 : chamber[0].length - 1;
        // Add walls along that row
        for(var col = 0; col < chamber[wallLineRow].length; col++){
            if(col !== entranceIdx && chamber[wallLineRow][col] && chamber[wallLineRow][col].type !== "startNode" && chamber[wallLineRow][col].type !== "finishNode") generatedWallsInOrder.push(chamber[wallLineRow][col]);
        }

        // Recursively repeat on subchambers until minimum size of chamber is reached
        // Get the two new chambers
        var newTopChamber = [];
        var newBottomChamber = [];
        for(var row = 0; row < chamber.length; row++){
            const currentRowTopChamber = [];
            const currentRowBottomChamber = [];
            for(var col = 0; col < chamber[0].length; col++){
                if(row < wallLineRow) currentRowTopChamber.push(chamber[row][col]);
                if(row > wallLineRow) currentRowBottomChamber.push(chamber[row][col]); 
            }
            if(currentRowTopChamber.length !== 0) newTopChamber.push(currentRowTopChamber);
            if(currentRowBottomChamber.length !== 0) newBottomChamber.push(currentRowBottomChamber);
            
        }

        generatedWallsInOrder = computeRecursiveDivision(newTopChamber, startNodeCoords, finishNodeCoords, generatedWallsInOrder);
        generatedWallsInOrder = computeRecursiveDivision(newBottomChamber, startNodeCoords, finishNodeCoords, generatedWallsInOrder);

    } else {
        // Select a random col within the chamber to draw walls. 
        // Leave a one col space to prevent a double wall
        var wallLineCol = randomInteger(1, chamber[0].length - 2);
        // Leave leave a space at one random location along the wall line
        var entranceIdx = randomInteger(0, 1) === 0 ? 0 : chamber.length - 1;
        // Add walls along that col
        for(var row = 0; row < chamber.length; row++){
            if(row !== entranceIdx && chamber[row][wallLineCol] && chamber[row][wallLineCol].type !== "startNode" && chamber[row][wallLineCol].type !== "finishNode") generatedWallsInOrder.push(chamber[row][wallLineCol]);
        }

        // Recursively repeat on subchambers until minimum size of chamber is reached
        // Get the two new chambers
        var newLeftChamber = [];
        var newRightChamber = [];
        for(var row = 0; row < chamber.length; row++){
            const currentRowLeftChamber = [];
            const currentRowRightChamber = [];
            for(var col = 0; col < chamber[0].length; col++){
                if(col < wallLineCol) currentRowLeftChamber.push(chamber[row][col]);
                if(col > wallLineCol) currentRowRightChamber.push(chamber[row][col]);
            }
            newLeftChamber.push(currentRowLeftChamber);
            newRightChamber.push(currentRowRightChamber);
        }

        generatedWallsInOrder = computeRecursiveDivision(newLeftChamber, startNodeCoords, finishNodeCoords, generatedWallsInOrder);
        generatedWallsInOrder = computeRecursiveDivision(newRightChamber, startNodeCoords, finishNodeCoords, generatedWallsInOrder);
    }

    return generatedWallsInOrder;
}

export function visualizeRecursiveDivision(algoVisualizer, grid, startNodeCoords, finishNodeCoords) {
    algoVisualizer.setState({running: true});
    resetGrid(algoVisualizer, ()=>{
        var startTime = new Date().getTime();
        // Get the generated walls in order
        const generatedWallsInOrder = computeRecursiveDivision(grid, startNodeCoords, finishNodeCoords, []);
        var runTimeSeconds = new Date().getTime() - startTime;
        algoVisualizer.setState({ runTimeSeconds, lastAlgoRunString: "Recursive Division" });
        animateGeneration(algoVisualizer, generatedWallsInOrder, setWalls);
    });
}

function setWalls(algoVisualizer, grid, walls){
    for(var node of walls){
        const newNode = {
            ...node,
            type: "wallNode"
            };
        grid[node.row][node.col] = newNode;
    }
    algoVisualizer.setState({ grid, numWalls: walls.length });
}