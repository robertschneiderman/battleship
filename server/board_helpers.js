exports.boats = [
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

exports.boatsCopy = [
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

const findOrigin = boat => {
    let limit = 9 - boat.capacity + 1;
    let limitedDim = getRandomNumber(0, limit);
    let regularDim = getRandomNumber(0, 9);
    return (boat.vertical) ? [limitedDim, regularDim] : [regularDim, limitedDim];
};

exports.randomAssignment = boats => {
    boats.forEach(boat => {
        boat.vertical = !!getRandomNumber(0, 1);
        let origin = findOrigin(boat);
        let dimIdx = (boat.vertical) ? 0 : 1;
        for (let i = 0; i < boat.capacity; i++) {
            let newOrigin = [origin[0], origin[1]];
            newOrigin[dimIdx] += i;
            boat.coordinates.push(newOrigin);
        }
    });
};

const createBlankGrid = () => {
    let grid = [];
    for (let i = 1; i <= 10; i++) {
        grid.push([]);
        for (let j = 1; j <= 10; j++) {
            let row = grid[grid.length-1];
            row.push({boat: 'blank', attacked: false});
        }
    }
    return grid;
};

exports.populateGrid = boats => {
    let grid = createBlankGrid();
    boats.forEach(boat => {
        boat.coordinates.forEach(coord => {
            grid[coord[0]][coord[1]].boat = boat.name;
        });
    });
    return grid;
};

// debugger;
