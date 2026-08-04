// Delivery calculator: estimates cost by distance and weight. Fill DISTANCE_API_KEY if using real service.
async function calculateDeliveryCost(originPostcode, destinationPostcode, weightKg){
  const DISTANCE_API_KEY = ''; // <<-- fill your distance API key if available
  const PER_KM_RATE = 3.5; // R per km
  const PER_KG_RATE = 12.0; // R per kg
  const BASE_FEE = 45.0; // base fee
  let distanceKm = 0;

  if(DISTANCE_API_KEY){
    try{
      const res = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(originPostcode)}&destinations=${encodeURIComponent(destinationPostcode)}&key=${DISTANCE_API_KEY}`);
      const json = await res.json();
      if(json.rows && json.rows[0] && json.rows[0].elements && json.rows[0].elements[0] && json.rows[0].elements[0].distance){
        distanceKm = json.rows[0].elements[0].distance.value / 1000;
      }
    }catch(e){ console.warn('Distance API failed, using fallback', e); }
  }

  if(!distanceKm || distanceKm === 0){
    distanceKm = 20; // fallback distance
  }

  const distanceCost = distanceKm * PER_KM_RATE;
  const weightCost = (weightKg || 0) * PER_KG_RATE;
  const total = BASE_FEE + distanceCost + weightCost;
  return { distanceKm: Math.round(distanceKm*10)/10, distanceCost: Math.round(distanceCost*100)/100, weightCost: Math.round(weightCost*100)/100, total: Math.round(total*100)/100 };
}
