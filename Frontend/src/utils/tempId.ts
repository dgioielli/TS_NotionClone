const tempId = () => {
    const hourText = new Date().getHours().toString();
    const minText = new Date().getMinutes().toString();
    const secText = new Date().getSeconds().toString();
    const miliText = new Date().getMilliseconds().toString();
    return (`${baseTempId}_${hourText}_${minText}_${secText}_${miliText}`)
  };
  
  export default tempId;
  export const baseTempId = "x_x_x_x_x";