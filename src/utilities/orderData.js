// Sort Data in reverse chronological order by datetime string
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare#examples
export function orderData (data) { return data.slice().sort((a, b) => {
       const    A          = JSON.stringify(a.created_utc);
       const    B          = JSON.stringify(b.created_utc);
       const    order      = B.localeCompare(A);
       return   order
     })
};