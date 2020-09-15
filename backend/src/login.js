async function main(args, res){
    console.log('received data : ' + 'ID : ' + args[0] + 'PW : ' + args[1] +'... done.');
    res.json({result:'OK'});
}

module.exports = {
    main:main
}