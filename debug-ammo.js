const equipmentData = require('./src/utils/json/equipment.json');

console.log('Total equipment items:', equipmentData.length);

const ammoItems = equipmentData.filter(item => 
  item.name === 'Arrows (d6)' ||
  item.name === 'Bolts (d6)' ||  
  item.name === 'Throwing Stones (d6)' ||
  item.name === 'Blowdarts (d8)' ||
  item.name === 'Throwing Darts (d6)'
);

console.log('Found ammo items:', ammoItems.length);
console.log('Ammo items:', ammoItems.map(item => item.name));

const transformedAmmo = ammoItems.map(item => ({
  name: item.name.replace(/\s\(d[0-9]+\)/, ''), 
  category: 'ammo',
  cost: parseInt(item.cost),
  properties: item.properties || 'supply',
  load: parseInt(item.load),
  quality: parseInt(item.quality),
  description: item.description,
}));

console.log('Transformed ammo:', transformedAmmo);
