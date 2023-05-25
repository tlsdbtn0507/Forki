const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const getting = async function(){
  try {
    const res = await fetch
    (`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`);
    const {data, message} = await res.json();

    if(!res.ok) throw new Error(`${message} (${res.status})`);

    console.log(data)

  } catch (error) {
    alert(error)
  }
};

console.log('hi');

getting();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
