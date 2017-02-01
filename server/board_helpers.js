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
        name: 'Patrol ship', 
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
        name: 'Patrol ship', 
        capacity: 2,
        hits: 0,
        coordinates: [],
        vertical: false
    }           
];

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const findOrigin = ship => {
    let limit = 9 - ship.capacity + 1;
    let limitedDim = getRandomNumber(0, limit);
    let regularDim = getRandomNumber(0, 9);
    return (ship.vertical) ? [limitedDim, regularDim] : [regularDim, limitedDim];
};

exports.randomAssignment = ships => {
    ships.forEach(ship => {
        ship.vertical = !!getRandomNumber(0, 1);
        let origin = findOrigin(ship);
        let dimIdx = (ship.vertical) ? 0 : 1;
        for (let i = 0; i < ship.capacity; i++) {
            let newOrigin = [origin[0], origin[1]];
            newOrigin[dimIdx] += i;
            ship.coordinates.push(newOrigin);
        }
    });
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

exports.populateGrid = ships => {
    let grid = createBlankGrid();
    ships.forEach(ship => {
        ship.coordinates.forEach(coord => {
            grid[coord[0]][coord[1]].ship = ship.name;
        });
    });
    return grid;
};

// debugger;
