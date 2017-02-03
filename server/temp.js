// Plan

// moves
// if he sunk a ship



keep record of pivot points... 
attack forward and back ho... if both miss or attacked, 
attack forward and back vert
if ship destroyed... check if original hit in destroyed ship coords... clear space


lastTurnDestroy
lastTurnFirstHit
lastTurnFailedHo
pivotPoints = [];
hits = []
moves = []
nextMoves = []
hoAdjacents
attackDir = 'forwards'
attackDis = 1
abandonBackwards = false
abandonFowards = false
abandonHo

if lastTurnDestroy... take last hit and get consecutive coordinates


asses next moves :
    if attDis > 1 && attDir === 'forward' {
        assess last two moves... 
            if both missed, switch to vert and reset moves (probably could only happen at attDis2... else ship had been sunk)
            if one missed... cancel moves in that dir
    }

const aiMove = () => {
    see if last move sunk ship...
        if so remove pivot point and hits for that ship
        if hits empty... then mode = random
            if another hit, get ho adjacents...


    assess next moves

    if (ai.mode === 'random' && lastMove === 'hit') {
        ai.pivotPoints.push(lastMove);
        check ho adjacents... if good, attack ho, else attack vert
        ai.nextMoves = get4ForwardAndBack
    }
    if (ai.mode === 'attackHo' && hoAdjacents === 'miss') {
        ai.mode === 'attackVert'
        nextMoves = get4ForwardAndBack(Vert)
    }

    move = nextPlannedMove... which is next in array, unless attacked, go 2 ahead
    

}