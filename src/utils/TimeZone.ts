export async function  searchTimeZone(zone: string): Promise<number> {
  return fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=LN5LSXERGUSJ&format=json&by=zone&zone=${zone}`)
    .then(response => response.json())
    .then(data => {
      console.log('data.gmtOffset', data.gmtOffset);
      return data.gmtOffset;
    })
    .catch(error => {
      console.error('Error:', error);
      return 0;
    });
}


  