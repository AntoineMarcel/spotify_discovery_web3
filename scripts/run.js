const main = async () => {
    const playlistContractFactory = await hre.ethers.getContractFactory("POTD");
    const playlistContract = await playlistContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
      });
    await playlistContract.deployed();
    console.log("Contract addy:", playlistContract.address);
    let contractBalance = await hre.ethers.provider.getBalance(
        playlistContract.address
      );
      console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
      );
   
      let playlistTxn = await playlistContract.proposal("A message!");
      await playlistTxn.wait();
    
      // let playlistTxn2 = await playlistContract.proposal("A 2 message!");
      // await playlistTxn2.wait();

      contractBalance = await hre.ethers.provider.getBalance(playlistContract.address);
      console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
      );
    
      let allPlaylist2s = await playlistContract.getTodayPlaylists();
      console.log(allPlaylist2s);

      let allPlaylists = await playlistContract.getAllPlaylists();
      console.log(allPlaylists[0].playlistr);

      
      let playlistTxn3 = await playlistContract.vote(allPlaylists[0].playlistr, allPlaylists[0].url, allPlaylists[0].timestamp);
      await playlistTxn3.wait();

      let votes = await playlistContract.getTodayVotes();
      console.log(votes);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();