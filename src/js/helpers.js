import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
};

export const ajax = async function(url, sending = undefined){
  const fetchPro = sending ? fetch(url,{
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(sending)
  }) : fetch(url);
  try {
    const res = await Promise.race([fetchPro,timeout(TIMEOUT_SEC)]);
    const { data, message} = await res.json();
    
    if(!res.ok) throw new Error(`${message} (${res.status})`);
    return data
  } catch (error) {
    throw error;
  }
}
