const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const tree = window.MerkleTree;
const keccak = window.keccak256;

let web3Modal
let provider;
let selectedAccount;
let remaningNFT;

$("#mint-nft").click(function(e) {
    mint();
});

$("#wallet-connect").click(function(e) {
    onConnect();
});

$('.do-min').click(function() {
    if (isNaN($('input[name=\'quantity\']').val() / 1) == false) {
        var quantity = $('input[name=\'quantity\']').val();
    } else {
        var quantity = 1;
    }
    if ($('input[name=\'quantity\']').val() > 1) {
        $('input[name=\'quantity\']').val(parseInt(quantity) - parseInt(1));
    }
    priceChnage();
});

$('.do-plus').click(function() {
    if (isNaN($('input[name=\'quantity\']').val() / 1) == false) {
        var quantity = $('input[name=\'quantity\']').val();
    } else {
        var quantity = 1;
    }
    $('input[name=\'quantity\']').val(parseInt(quantity) + parseInt(1));
    priceChnage();
});

$("#input-quantity").change(function(e) {
    priceChnage();
});

window.addEventListener('load', async () => {
    init();
    $('.onlynumeric').bind('keypress', function(e) {
        var code = e.keyCode || e.which;
        if (code > 31 && (code < 48 || code > 57) || (code == 9)) {
            return false;
        }
        return true;
    });
});

async function onConnect() {
    try {
        provider = await web3Modal.connect();
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }
    await init2();
}

var abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"GIVEAWAY_MINTED","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"GIVEAWAY_NFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_BY_MINT_IN_TRANSACTION_PRESALE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_BY_MINT_IN_TRANSACTION_SALE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_MINT_PRESALE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_MINT_SALE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PRESALE_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SALE_MINTED","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SALE_NFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SALE_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"merkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"mintGiveawayNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_count","type":"uint256"},{"internalType":"bytes32[]","name":"merkleProof","type":"bytes32[]"}],"name":"mintPreSaleNFT","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"mintSaleNFT","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newBaseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"status","type":"bool"}],"name":"setPreSaleStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"status","type":"bool"}],"name":"setSaleStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newSupply","type":"uint256"}],"name":"updateGiveawaySupply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"newRoot","type":"bytes32"}],"name":"updateMerkleRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newLimit","type":"uint256"}],"name":"updateMintLimitPerTransectionPreSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newLimit","type":"uint256"}],"name":"updateMintLimitPerTransectionSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newLimit","type":"uint256"}],"name":"updatePreSaleMintLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"updatePreSalePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newLimit","type":"uint256"}],"name":"updateSaleMintLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"updateSalePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newSupply","type":"uint256"}],"name":"updateSaleSupply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"presalemint","type":"uint256"},{"internalType":"uint256","name":"salemint","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
var contractAddress = '0x51CC1078b5972a4371cD6ae2c9b195Fd3B103C10';

var userAddress = '';
var contract = undefined;
var saleEnable;
var presaleEnable;
var MintLimit = 0;
var NFTprice = 0;
var buttondisplay = "Yes";
var MAX_BY_MINT_IN_TRANSACTION_PRESALE = 0;
var MAX_BY_MINT_IN_TRANSACTION_SALE = 0;
var TRANSACTION_LIMIT = 0;
var markelTree;
var SALE_PRICE;
var PRESALE_PRICE;

async function init() {
    let whitelistAddress = [
        "0x44E7adfF3efDe95582CBFE8B814641ca09C7dD81",
        "0x83505a7698B96c942F9B6878B07553B696c655f1",
    ];
    
    const leafNodes = await whitelistAddress.map(addr => keccak(addr));
    markelTree = await new tree(leafNodes, keccak, {
        sortPairs: true
    });
    const roothash = await markelTree.getRoot().toString('hex');
    console.log(roothash);

    var web3 = new Web3('https://mainnet.infura.io/v3/7516caea5b744c72baa53889783041ad');
    contract = new web3.eth.Contract(abi, contractAddress);

    let MAX_NFT = parseInt(await contract.methods.SALE_NFT().call());
    let Supply = parseInt(await contract.methods.SALE_MINTED().call());

    let MAX_MINT_IN_SALE = parseInt(await contract.methods.MAX_MINT_SALE().call());
        SALE_PRICE = parseInt(await contract.methods.SALE_PRICE().call());
        MAX_BY_MINT_IN_TRANSACTION_SALE = parseInt(await contract.methods.MAX_BY_MINT_IN_TRANSACTION_SALE().call());
        saleEnable = await contract.methods.saleEnable().call();

    let MAX_MINT_IN_PRESALE = parseInt(await contract.methods.MAX_MINT_PRESALE().call());
        PRESALE_PRICE = parseInt(await contract.methods.PRESALE_PRICE().call());
        MAX_BY_MINT_IN_TRANSACTION_PRESALE = parseInt(await contract.methods.MAX_BY_MINT_IN_TRANSACTION_PRESALE().call());
        presaleEnable = await contract.methods.presaleEnable().call();
        remaningNFT = MAX_NFT-Supply;
    
    if(MAX_NFT == Supply) 
    {
         $("#mint-nft").html('All NFT Sold');
         $("#mint-nft").attr("disabled", true);
    }
    
    if(saleEnable) 
    {
        MintLimit = MAX_MINT_IN_SALE;
        if (MAX_BY_MINT_IN_TRANSACTION_SALE > MintLimit) 
        {
            MAX_BY_MINT_IN_TRANSACTION_SALE = MintLimit;
        }
        TRANSACTION_LIMIT = MAX_BY_MINT_IN_TRANSACTION_SALE;
        NFTprice = SALE_PRICE / 10 ** 18;
        $("#ETH").html(NFTprice);
    } 
    else if (presaleEnable) 
    {
        MintLimit = MAX_MINT_IN_PRESALE;
        if (MAX_BY_MINT_IN_TRANSACTION_PRESALE > MintLimit) 
        {
            MAX_BY_MINT_IN_TRANSACTION_PRESALE = MintLimit;
        }
        TRANSACTION_LIMIT = MAX_BY_MINT_IN_TRANSACTION_PRESALE;
        NFTprice = PRESALE_PRICE / 10 ** 18;
        $("#ETH").html(NFTprice);
    } 
    else 
    {
        NFTprice = PRESALE_PRICE / 10 ** 18;
        $("#ETH").html(NFTprice);
        MintLimit = MAX_MINT_IN_PRESALE;
        if (MAX_BY_MINT_IN_TRANSACTION_PRESALE > MintLimit) 
        {
             MAX_BY_MINT_IN_TRANSACTION_PRESALE = MintLimit;
        }
        TRANSACTION_LIMIT = MAX_BY_MINT_IN_TRANSACTION_PRESALE;
        $("#mint-nft").html('Minting Paused');
        $("#mint-nft").attr("disabled", true);
        buttondisplay = "No"
    }

    $("#totalSupply").html(MAX_NFT);
    $("#totalMint").html(Supply);
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: "7516caea5b744c72baa53889783041ad",
                chainId: 1,
            }
        }
    };
    web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
    });
    console.log("Web3Modal instance is", web3Modal);

}

function priceChnage() {
    var count = parseInt($("#input-quantity").val());
    if (count > TRANSACTION_LIMIT) {
        
        var price = (TRANSACTION_LIMIT * parseFloat(NFTprice)).toFixed(2);
        $("#input-quantity").val(TRANSACTION_LIMIT);
    } 
    else 
    {
        var price = (count * parseFloat(NFTprice)).toFixed(2);
    }
    $("#ETH").html(price);
}

async function init2() {
    const web3 = new Web3(provider);
    contract = new web3.eth.Contract(abi, contractAddress);
    web3.eth.getAccounts(function(err, accounts) {
        if (err != null) {
            swal({
                title: "Error Found",
                text: err,
                type: "error",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Ok",
                closeOnConfirm: false
            });
        } else if (accounts.length === 0) {
            swal({
                title: "Error Found",
                text: 'Your Wallet is Locked. Please Unlock It To Use DAPP',
                type: "error",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Ok",
                closeOnConfirm: false
            });
        } else if (web3.currentProvider.chainId != 1) {
            swal({
                title: "Error Found",
                text: 'Make Sure You Are Using The ETH Network',
                type: "error",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Ok",
                closeOnConfirm: false
            });
        } else {
            userAddress = accounts[0];
            userStatsUpdate();

        }
    });
}

async function userStatsUpdate() {
    if (buttondisplay == "Yes" && saleEnable) 
    {
         var getSaleMinted = await contract.methods.users(userAddress).call();
             MintLimit = MintLimit - getSaleMinted.salemint;
         if(0 >= MintLimit) 
         {
             $("#mint-nft").html('Already Minted');
             $("#mint-nft").attr("disabled", true);
         }
         if (MAX_BY_MINT_IN_TRANSACTION_SALE > MintLimit) 
         {
             MAX_BY_MINT_IN_TRANSACTION_SALE = MintLimit;
         }
         TRANSACTION_LIMIT = MAX_BY_MINT_IN_TRANSACTION_SALE;
    } 
    else if (buttondisplay == "Yes" && presaleEnable) 
    {
        var getPreSaleMinted = await contract.methods.users(userAddress).call();
            MintLimit = MintLimit - getPreSaleMinted.presalemint;
        if (0 >= MintLimit) 
        {
            $("#mint-nft").html('Already Minted');
            $("#mint-nft").attr("disabled", true);
        }
        if (MAX_BY_MINT_IN_TRANSACTION_PRESALE > MintLimit)
        {
            MAX_BY_MINT_IN_TRANSACTION_PRESALE = MintLimit;
        }
        TRANSACTION_LIMIT = MAX_BY_MINT_IN_TRANSACTION_PRESALE;
    }
    priceChnage();
    $("#wallet-connect").hide();
    $("#mint-nft").show();
}

async function mint() {
    try {
        $("#error").html('');
        var count = parseInt($("#input-quantity").val());
        if (count == 0) 
        {
            $("#error").html('Mint Atleast 1 NFT');
        } 
        else if (count > remaningNFT) 
        {
            $("#error").html("Can't Mint More Than Remaning NFT");
        } 
        else 
        {
            
            if (saleEnable) 
            {
                if (count > MAX_BY_MINT_IN_TRANSACTION_SALE) 
                {
                     $("#error").html("Can't Mint More Than " + MAX_BY_MINT_IN_TRANSACTION_SALE + " NFT");
                } 
                else 
                {
                    var price = count * SALE_PRICE;
                    contract.methods.mintSaleNFT(count).estimateGas({
                            from: userAddress,
                            value: price
                        }).then(function(gasAmount) {
                            contract.methods.mintSaleNFT(count).send({
                                from: userAddress,
                                value: price
                            }, function(error, tx) {
                                if (error) {
                                    swal({
                                        title: "Error Found",
                                        text: error.message,
                                        type: "error",
                                        showCancelButton: false,
                                        confirmButtonClass: "btn-danger",
                                        confirmButtonText: "Ok",
                                        closeOnConfirm: false
                                    });
                                } else {
                                    swal({
                                        title: "Mint Request Submitted Successfully",
                                        text: "Please Wait For Wallet Confirmation",
                                        type: "success",
                                        showCancelButton: false,
                                        confirmButtonClass: "btn-danger",
                                        confirmButtonText: "Ok",
                                        closeOnConfirm: false
                                    });
                                }
                            });
                        })
                        .catch(function(error) {
                            swal({
                                title: "Error Found",
                                text: 'Insufficient Funds For Transaction in Wallet',
                                type: "error",
                                showCancelButton: false,
                                confirmButtonClass: "btn-danger",
                                confirmButtonText: "Ok",
                                closeOnConfirm: false
                            });
                        });
                }
            } 
            else if (presaleEnable) 
            {
                var price = count * PRESALE_PRICE;
                if (count > MAX_BY_MINT_IN_TRANSACTION_PRESALE)
                {
                    $("#error").html("Can't Mint More Than " + MAX_BY_MINT_IN_TRANSACTION_PRESALE + " NFT");
                } 
                else 
                {
                    var claimAddress = keccak(userAddress).toString('hex');
                    const merkleProof = markelTree.getHexProof(claimAddress);
                    if (merkleProof == "" || merkleProof == undefined) {
                        swal({
                            title: "Error Found",
                            text: 'Your Address Is Not WhiteListed For Pre-Sale',
                            type: "error",
                            showCancelButton: false,
                            confirmButtonClass: "btn-danger",
                            confirmButtonText: "Ok",
                            closeOnConfirm: false
                        });
                    } else {
                        contract.methods.mintPreSaleNFT(count, merkleProof).estimateGas({
                                from: userAddress,
                                value: price
                            }).then(function(gasAmount) {
                                contract.methods.mintPreSaleNFT(count, merkleProof).send({
                                    from: userAddress,
                                    value: price
                                }, function(error, tx) {
                                    if (error) {
                                        swal({
                                            title: "Error Found",
                                            text: error.message,
                                            type: "error",
                                            showCancelButton: false,
                                            confirmButtonClass: "btn-danger",
                                            confirmButtonText: "Ok",
                                            closeOnConfirm: false
                                        });
                                    } else {
                                        swal({
                                            title: "Mint Request Submitted Successfully",
                                            text: "Please Wait For Wallet Confirmation",
                                            type: "success",
                                            showCancelButton: false,
                                            confirmButtonClass: "btn-danger",
                                            confirmButtonText: "Ok",
                                            closeOnConfirm: false
                                        });
                                    }
                                });
                            })
                            .catch(function(error) {
                                swal({
                                    title: "Error Found",
                                    text: 'Insufficient Funds For Transaction in Wallet',
                                    type: "error",
                                    showCancelButton: false,
                                    confirmButtonClass: "btn-danger",
                                    confirmButtonText: "Ok",
                                    closeOnConfirm: false
                                });
                            });
                    }
                }
            }
        }
    } catch (error) {
        swal({
            title: "Error Found",
            text: error,
            type: "error",
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Ok",
            closeOnConfirm: false
        });
    }
}