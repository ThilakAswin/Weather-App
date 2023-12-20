exports.getDate = function(){

    const today = new Date();

    let options = {
        weekday : "long",
        day : "numeric",
        month: "long",
        year: "numeric"
    };

    return today.toLocaleString("en-US",options);

}