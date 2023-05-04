import axios from "axios"

const bundlephobia = async (pkg) => {
  let run;
  try {
    const { data } = await axios.get("https://bundlephobia.com/api/size", {
      params: { package: pkg }
    });

    run = data;
  } catch (err) {
    run = err.message;
  }
  
  return run;
};

export default bundlephobia;
