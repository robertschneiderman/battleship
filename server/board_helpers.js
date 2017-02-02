exports.ships = [
    {
        name: 'Aircraft Carrier', 
        capacity: 5,
        hits: 0,
        coordinates: [],
        vertical: false
    }, {
        name: 'Battleship', 
        capacity: 4,
        hits: 0,
        coordinates: [],
        vertical: false
    },{
        name: 'Submarine', 
        capacity: 3,
        hits: 0,
        coordinates: [],
        vertical: false
    }, {
        name: 'Destroyer', 
        capacity: 3,
        hits: 0,
        coordinates: [],
        vertical: false
    },{
        name: 'Patrol Boat', 
        capacity: 2,
        hits: 0,
        coordinates: [],
        vertical: false
    }           
];

exports.shipsCopy = [
    {
        name: 'Aircraft Carrier', 
        capacity: 5,
        hits: 0,
        coordinates: [],
        vertical: false
    }, {
        name: 'Battleship', 
        capacity: 4,
        hits: 0,
        coordinates: [],
        vertical: false
    },{
        name: 'Submarine', 
        capacity: 3,
        hits: 0,
        coordinates: [],
        vertical: false
    }, {
        name: 'Destroyer', 
        capacity: 3,
        hits: 0,
        coordinates: [],
        vertical: false
    },{
        name: 'Patrol Boat', 
        capacity: 2,
        hits: 0,
        coordinates: [],
        vertical: false
    }           
];

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createBlankGrid = () => {
    let grid = [];
    for (let i = 1; i <= 10; i++) {
        grid.push([]);
        for (let j = 1; j <= 10; j++) {
            let row = grid[grid.length-1];
            row.push({ship: 'blank', attacked: false});
        }
    }
    return grid;
};

const findOrigin = ship => {
    let limit = 9 - ship.capacity + 1;
    let limitedDim = getRandomNumber(0, limit);
    let regularDim = getRandomNumber(0, 9);
    ship.vertical = !!getRandomNumber(0, 1);
    return (ship.vertical) ? [limitedDim, regularDim] : [regularDim, limitedDim];
};

const getCoordinates = ship => {
    // ships.forEach(ship => {
        // ship.coordinates = [];
        let coordinates = [];
        let origin = findOrigin(ship);
        let dimIdx = ship.vertical ? 0 : 1;
        for (let i = 0; i < ship.capacity; i++) {
            let newOrigin = [origin[0], origin[1]];
            newOrigin[dimIdx] += i;
            coordinates.push(newOrigin);
        }
        return coordinates;
    // });
};

const getCoordinatesAndCheckOverlap = (grid, ship) => {
    ship.coordinates = getCoordinates(ship);
    return ship.coordinates.every((el) => {
        return grid[el[0]][el[1]].ship === 'blank';
    });
};

exports.populateGrid = ships => {
    let grid = createBlankGrid();
    ships.forEach(ship => {
        let noOverlap = getCoordinatesAndCheckOverlap(grid, ship);
        while(!noOverlap) {
            noOverlap = getCoordinatesAndCheckOverlap(grid, ship);
        }

        for (let i = 0; i < ship.coordinates.length; i++) {
            let coord = ship.coordinates[i];
            let space = grid[coord[0]][coord[1]];

            grid[coord[0]][coord[1]].ship = ship.name; 
            grid[coord[0]][coord[1]].idx = (i+1); 
            grid[coord[0]][coord[1]].vertical = ship.vertical;
        }
    });
    return grid;
};

exports.getRandCoords = () => {
    return [getRandomNumber(0, 9), getRandomNumber(0, 9)];
};

// debugger;
