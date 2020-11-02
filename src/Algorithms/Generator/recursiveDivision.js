import {resetGrid, randomInteger, animateGeneration} from '../helpers';


// TODO: 
// Check for smallest chamber
// Avoid start and finish nodes
export function computeRecursiveDivision(chamber, startNodeCoords, finishNodeCoords, generatedWallsInOrder){
    
    const min_chamber_size = 2;

    // If minimum chamber size is reached, return the generated walls
    if(chamber.length <= min_chamber_size || chamber[0].length <= min_chamber_size ){
        // DEBUG changed && to ||
        return generatedWallsInOrder;
    }

    // // Check if start node is in the chamber, if it is, do not draw a wall there
    // if(startNodeCoords[0] < chamber[0].length && startNodeCoords[1] < chamber[1].length){
    //     var startNode = chamber[startNodeCoords[0]][startNodeCoords[1]];
    //     // TODO
    // }

    // // Check if finish node is in the chamber, if it is, do not draw a wall there
    // if(finishNodeCoords[0] < chamber[0].length && finishNodeCoords[1] < chamber[1].length){
    //     var finishNode = chamber[finishNodeCoords[0]][finishNodeCoords[1]];
    //     // TODO
    // }

    // Divide chamber with randomly placed wall
    // 0 for horizontal, 1 for vertical
    if(randomInteger(0, 1) === 0){
        // Select a random row within the chamber to draw walls. 
        // Leave a one row space to prevent a double wall
        var wallLineRow = randomInteger(1, chamber.length - 2);
        // Add walls along that row
        // Leave leave a space at one random location along the wall line
        var openingCol = randomInteger(0, chamber[wallLineRow].length);
        for(var col = 0; col < chamber[wallLineRow].length; col++){
            if(col !== openingCol) generatedWallsInOrder.push(chamber[wallLineRow][col]);
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
        // Add walls along that col
        // Leave leave a space at one random location along the wall line
        var openingRow = randomInteger(0, chamber.length);
        for(var row = 0; row < chamber.length; row++){
            if(row !== openingRow) generatedWallsInOrder.push(chamber[row][wallLineCol]);
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
        // Get the generated walls in order
        const generatedWallsInOrder = computeRecursiveDivision(grid, startNodeCoords, finishNodeCoords, []);
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
    algoVisualizer.setState({ grid });
}