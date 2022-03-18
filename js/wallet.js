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
        "0xdD181A4EfEbb1dB0C0128cDceaf32B152aB0ce5b",
        "0xf405EeE5a37A2611754652e68abcbaFcBDb96f91",
        "0xE66d1d30CEf274c6F122Fa02E64cC9990f2De12b",
        "0xa79C809161da0d1CCb576cc86532945100CD741D",
        "0xA72119C7bBDF4F886bA1f7ca41E4ba46E8BA5940",
        "0x72564AEDf81b8FAb5426A23c09f66998AC0C2c8B",
        "0x1c51AC7010986475F40cBFD0814159be3a967ad5",
        "0x6e925164D5dD4e5Dbc332cd21813F84E2177Ee96",
        "0x6e925164D5dD4e5Dbc332cd21813F84E2177Ee96",
        "0xc41ac9834D91a60f2560b3aB94460c8E874bb3B2",
        "0x93a50acfCA3E8C4Fe560Ed1ab44fCAEc0A3cc662",
        "0x67519C97FbCD9352beF138205f650dD305d903f9",
        "0x6BDfA13ba34eac9540b32770328a0a44F8712e2F",
        "0x2beAaF8C482A3Ce07A6ea74c1a1a9C2FfCeb0C85",
        "0x55FB7f3A5d08FdEc3bdc066A9e3A2CEfA391880f",
        "0x81425d71ee3d575172e2348f460C66CaCE91f379",
        "0xE66d1d30CEf274c6F122Fa02E64cC9990f2De12b",
        "0x55FB7f3A5d08FdEc3bdc066A9e3A2CEfA391880f",
        "0x6e925164D5dD4e5Dbc332cd21813F84E2177Ee96",
        "0x70059f272d2B9E6eC87f70738032E4d0DaEc3320",
        "0xfB3f8736d4538D53b4957C66F3Cc974B2BB6474C",
        "0xdc8134a32fc4b698643f4b7B313184c721138b84",
        "0xab2755f6EE2792D72E0AeF296E1f63447E7a3f80",
        "0xd617B68C43d4004c31257190BC72e18BC88b6AE5",
        "0x37792519aAeC334a6A1C7dfc93dd578207F1Be67",
        "0x594D3831698de6F1b946163ED4876E990E31d421",
        "0x061693D44479344D56AEf8C2Ef23a6B6Cd5bE3d8",
        "0x84CAc649470eFa3A860696CE1ae3780d9cd3e6F5",
        "0x2E4719e622f4f2F0332EB84Ad6d1D2d91Ad6bf23",
        "0x1E384E8E43daa757d0952a977D8F3498d7B4fDB9",
        "0x5c019b3Ad19700a6c9881b09823026DA5C7092De",
        "0x4A0b88313a1D609061587989F75CEC5adB34d959",
        "0x6B3537903332ba4Debc76321348dD68377129e03",
        "0xFCeAAcE224ADc5DCD146129CD9c3e4E36c0eD58E",
        "0x462F963c517f19Ac7966Db3570941CB28bf430dB",
        "0xfE65b37Bbac64e5eB9905E254a9F389f5141E841",
        "0xB37fC4413A2cd0aCE7365D5399D5fbA13eafEF84",
        "0xE8f5A1d9fFE40817221B1748F12E5741d67fB7C3",
        "0x06676BaE310B957F4aD7811CA84eaE35039901De",
        "0x6765CE5b1eBD492f3B50cCa56dD38dE1d3c57389",
        "0x172e27B0475Cf4BE995241fC224811bE9cfd3040",
        "0x7d7174cb125a296b6e4f26750cccc6dad8229f93",
        "0x5da8C4cF66EFA7b14bD8Fe2313a9ea883C9Ba782",
        "0xB9c42271C16164BfaD487E5f16B60DA239B5E322",
        "0xcDe33Bc801B804D0E711246B2a73bbE7E6573a0A",
        "0x302a669138699ABF0D6fa26fBa493C9e4EF9b2B8",
        "0x84F5580b9E6F3a0EB253C14F67750490Ac1EbA0f",
        "0xe648cceF21E302C84C003697acA1951Ec304F95b",
        "0x6f36822b64f3c9498845EF8e1aF56ec52C3e8836",
        "0xC5e68D3c3d32A132897dCB1AEF7C6750c58Fe007",
        "0x616A90C15836593e9C6976D170304A7cFd3b8916",
        "0xB03c612ABA666Dc5654B044CCB10Cc1611Ff0593",
        "0x46994Ffde9fDB921B5cd58D9dFa0b7863eC698A6",
        "0x6dbB15EdB8Bc5a9b4f8C6909Ee8666d80D6fDD81",
        "0x81462B5C1Efb473B793bDc96C5ccb341F138798d",
        "0x6924Bdf5e901F6730e8d4E36077c677904308Ae7",
        "0x484FfBAd77BFb2569e5E65137A0F719632B4a808",
        "0x8A4B2ea16DAF8727d4CcFD957c70Ca4Da5b97b31",
        "0xf455800469fF02D4D00BC60D1256e3F2b894C90A",
        "0x7cC558d62d0328A73e6c52851ec7B3F7a17f10a9",
        "0x1d7b2310659850931053ad6fb53Add567F99d5C0",
        "0x9096319926a8a46B05788Ac202336BFCc546dc36",
        "0x58415DFd281660A65f3C06475D7D70f35696D1cd",
        "0xe63F159B8A53067dfe3ceCeB9Cd6fA1bF2b8089B",
        "0x08430b4Dfb72689b4193aCAdeFE37Abde6aE93f2",
        "0xfc2eb21c71e2678a8CD43AF3Ff77f7a0b2E9B565",
        "0x4d9B7825113D97Ee74d7ab98F5a39Ae059b7E475",
        "0x0E98512f938327F2208BEa21bdb4B385a121cAf4",
        "0xbA25DDe0E0814f0bdee6cb0CC2ffFE312B871c89",
        "0x1E384E8E43daa757d0952a977D8F3498d7B4fDB9",
        "0x9F9dF8d5F2e650E89aC8369eBF44C1B21CFC6fa7",
        "0x7A04F223e675caCcC8d62450302DE9e25F664081",
        "0x7A04F223e675caCcC8d62450302DE9e25F664081",
        "0x2FE7cb6a9d4a34E24f0B2D9665c2B8996D66FF96",
        "0x6924Bdf5e901F6730e8d4E36077c677904308Ae7",
        "0x4355E260D25CeDf0f48EAdC374EF1bD0bD524C46",
        "0xFD64Cb36aCE57e6A0F7d7739e40E5c5f814f3209",
        "0x8abDdC9Cd9E90F90B3cf33A54CCD35c072e11F70",
        "0xe63F159B8A53067dfe3ceCeB9Cd6fA1bF2b8089B",
        "0x99B39ac9EeF7725A94a5FeE020139fcDC13E7b2F",
        "0x364E9AA8AD8201DB52D80a1D8146ae6fcd0452b9",
        "0x8e40145D8349b526D4EF4b25F77930237e0B249f",
        "0x7A04F223e675caCcC8d62450302DE9e25F664081",
        "0xD0376ee4dbd108B16358bDe5571272BeC721C8Ad",
        "0x54C5dc338f14a0B90038E583aFA2F47023029FB1",
        "0x7f2AC1156530cE6e1FCb2734aeb038b0F265c8C1",
        "0x6C5234034EfB1dCA5356AE9AA76260d6Eb8cae0e",
        "0xfbECF25bc5De27655e263052cA9524ed8F2F58b8",
        "0x6319cf52E52224C41F981B85075aF25466A4F619",
        "0xdc8134a32fc4b698643f4b7B313184c721138b84",
        "0x4A0b88313a1D609061587989F75CEC5adB34d959",
        "0x8c149eBFE3B0d5170c216F2D3c64C964C51f48Aa",
        "0x3e1DC2e5765cFA02f43Aa492a30aB27a3D330877",
        "0x099af96Addc9dC39B895dAF26A7930D325419cb1",
        "0x8c60e960C9A25bc85d1Df5a59F0282c3B82d7903",
        "0xD726947c5c50E173B84bf47C6705eddABa38e695",
        "0x04b915Ce9623d1D1f73e4d3FC7cDD9F628347d26",
        "0xf5e1653818DD1e2E378b69719B9C08A13635A0bd",
        "0x7A8c2D116a7cB6B75b2730c26dDBDFFdFe741130",
        "0x2FEEB37D0Ac8F777E52660e84a78BC84F74a4E02",
        "0xA9E70E5AE4dba01F91506Afca0372c1C9863B45d",
        "0x9B1e6AB63fD6da7d018A588CaF9dFCB278eE82e4",
        "0xFeB09D8e34F816fA166fc7548bedb2aD8840a6F6",
        "0xCA02db9DD1a020b08d9f8AA082a9d99Cb5E095b9",
        "0x6B03cFB59052B3729c12dDC48508604fFcE89495",
        "0xF601abbB8dA8AD49B71DCf26f2E6Ba527eD91115",
        "0x73937B967e1030062dd3CAAcC1d8B137Db887131",
        "0xaae6c6a44324F6C4Eff1cD6cB45B30B0016Ca025",
        "0xEA190CfdB393A08642866e7256EA748A880c386f",
        "0x05e04542f84575C6EF2cC4CBc5301caD0e7ecE73",
        "0x6388964D6C5F3B0631607597D3320c5A5Fe1348E",
        "0xBe4994bA4eCd5b524221aC48400eCbeA6171D0fe",
        "0x261ac389Da4a1dA58BAC4c57747b6b0CaAcEaEe9",
        "0xA393Bc49D54cE9eA6867643F620614EFBE003E20",
        "0x5D33d7b4aF300e21a3cf05eFF24EA9Ed166fBE62",
        "0x8abDdC9Cd9E90F90B3cf33A54CCD35c072e11F70",
        "0x53035E4e14fb3f82C02357B35d5cC0C5b53928B4",
        "0xA0b9aFd2A5ae168D4061bdBFd2669b977E7436Fe",
        "0x7A4039df0181349C616Ff03Bcee3B6DcC8Df13c4",
        "0xB1604d16cD05bDA7Ff73Ec56148DC842339e42e7",
        "0x81A49D2955FC9df1fF9Af5e899e9f615F9b7Efd4",
        "0x4247a09a139581623Cc05eb11CD11999E88ff49D",
        "0x95B9F00646E1018096e6F8D3FeE616730CfaBd0F",
        "0x39AAb7348Ee10834DE144aB450A12eab67019a75",
        "0xE500DfA92311d9513c239fc43D7194188Cc79Bed",
        "0x896d4D710d45311A80c9344c2f25830abE5E40c3",
        "0x71CEfF24384d5AA6bb972120227BD128Dce8ccc6",
        "0xFD64Cb36aCE57e6A0F7d7739e40E5c5f814f3209",
        "0x23F1Cd015fa2ABc78E44C08CbaD3BcEa5F21059A",
        "0x39AAb7348Ee10834DE144aB450A12eab67019a75",
        "0x11fb320964Fcd205931610b2D1401A80cfF48e8F",
        "0xbDAA11008E28199d61c51b5bAf7E133F6a06FAE4",
        "0xd403E78110978702D4fF4AB0Da0D3452284fBdD1",
        "0xda789a8B1b6F115841e7180d2b40e6CFa54cDF1b",
        "0x192463197aF4b9E4d7f31Ca39aE93C840BcEc9ed",
        "0xCD2d50e1Ad61c0ef255F6609805d2b6cd2e52D5c",
        "0xBd2Cc114EF3eB6f8fD21DD6f9844d6bd20a155C1",
        "0x216C8C6A0233304A1074e246e43899D1FaE0E9D6",
        "0x370C267c8eF6a2D92f02142B824e343D2F7b0110",
        "0x1cC3B8EB623F6F256c87Eb645135B0DCA5545015",
        "0x8BcFA94392e26E169DD3d82dbaf54b6b776DE690",
        "0x47A330c3647AdD26cD652a172166C90046E84C73",
        "0xD5024493D2C8e443C299518AF23e5731e322851b",
        "0xfDD2e610Ff1486C4f65B52BD66c0373681559214",
        "0x7e8e89B11A2F4bC51b10f982bC2E83a340a6C6B7",
        "0xe77F807584F04728fF8B48653Ebb8DBFd5900aC0",
        "0xF7b8301347bB7267356Ed7835AC69ec0bC14dEce",
        "0x9E555B35EE9C3ae611effD41bFE707Dd8498f95E",
        "0xcA42C9229FC5c83b915F1377775A16E2Da62614a",
        "0x3a76A3c1818B235DA686Cf941BD2a46A0B9010e1",
        "0xa07DDA258265cAeFEF91a49bE775e50E2A086D1c",
        "0x9eCc87D4b5D3f66133F028498845bAB2397F2BA7",
        "0xfF13f758DFDE72c92c99916C0519b93A79F22362",
        "0xdc5D225547FAdE385F34C2C139Bf043Adb2779c6",
        "0x6cC382A5DA01e4A99B4d037911FA97e873382cBC",
        "0x711A777aCe768CD8991c98adBd56E91fA2d1c017",
        "0x89bAdD150026f47ebF2E1a5Fb36af494A4Ee63fB",
        "0x9B166663bbb15fBe9b3b1dc19D41C59BAcDce2e0",
        "0x4247a09a139581623Cc05eb11CD11999E88ff49D",
        "0x65e8d557094aCe3964586154a3CAc68e62a6c034",
        "0xDa2E9f3E55e7490b0d7860fc4239b7ab8cF8Ad99",
        "0x073fc2384a727Bb04d1F059Ae84f0611b511dE05",
        "0x96fF3De3F5a56c80B9893Ccbf415af08eA7F2838",
        "0x3a76A3c1818B235DA686Cf941BD2a46A0B9010e1",
        "0xbB4Cb515837545b371ADd8F7348984E2424498aE",
        "0xbB5693Dc012597A584CADAd515a552dC7fE31fb2",
        "0x357723925DCDFcAEFaB156B40F5fE58E887c3cb6",
        "0x2d1c1ccE75ca297987080f67BE956AAD0E4Be28e",
        "0x36ae458E6511092618E43bD9234727415A2C7898",
        "0x7A04F223e675caCcC8d62450302DE9e25F664081",
        "0xa9629552477E0F6F8A3113255b810056575e629a",
        "0x0bC22a1eCA5DE9119401A646a510a020b6c65096",
        "0x8f46A3D7eca5454519e7472245Ed84d0DDC7407c",
        "0x5EAd0Be43882d6d2274f0d4AFc56018d4754827F",
        "0xab76457970726333ABab3ca96686D48a7C8420c3",
        "0x11c39768c052ba0a07ef601badc91c906646dca5",
        "0x638826cDfe42D5E8483B3F9F0d1FC8A6123aC30c",
        "0x11c39768c052ba0a07ef601badc91c906646dca5",
        "0xd2D67bf637e463d70726Cb6507629A38C21F53a2",
        "0x8c7d43b5417065C971D5a31928725F9B209582eE",
        "0x1E384E8E43daa757d0952a977D8F3498d7B4fDB9",
        "0xa9629552477E0F6F8A3113255b810056575e629a",
        "0x4355E260D25CeDf0f48EAdC374EF1bD0bD524C46",
        "0x2d801b634331d0b260734b6f1d8064c6101bacc4",
        "0xEDBF959746487aC1a1fA2bE5E2f3A7dAACED6792",
        "0x2518Bc44Af600c623C07f3Eef8d6AbCb71de5ef1",
        "0xb0CF03FDc1D8F6f0DBe9b220b79097e62B4F1666",
        "0xe63F159B8A53067dfe3ceCeB9Cd6fA1bF2b8089B",
        "0x6B84d78F4FA3bdE2419C2671C1d568383bC6F723",
        "0x6e15bE326294d71f066Dfc08E153B11d02A107bE",
        "0x9f59B71f0ee68e2286F057767f10F03BbE5b8034",
        "0x5cd7705bf75a3e5be557abacb74659a6b47c6a23",
        "0x7695205c2cda7aa76afbc6fae5093306b931377c",
        "0xd1dD546b28925f3d61461399807135bBfC75A6bB",
        "0xAC314B957AF334bE371f75ac8964C2b71DE5Ad1b",
        "0xA586C5C31CF6731eca8440282d70f1846c4927CD",
        "0x1c6dd119CC05352cD82865288197Ce7CA0c8b2eC",
        "0xEee47f88796908FD5aCFDD0525986f6763bA1d2C",
        "0xa94a546460Ce634de5aE4F19df8De501a7026a1B",
        "0x177555CA26CB424a6bD304961E576021b1dc900F",
        "0x18F57Dd53512f6d4806Ca31547FfA0da78871a9d",
        "0x0f10A78A7451614D67350d4E27b1296B1a7d672d",
        "0xAAb395fF29a3Fb0f3224507Fa9095CBbdf0d401a",
        "0xB2479E40EBcbe1ee94E89C857B67635102b5D13A",
        "0xa6fd8c21bccda60f96add2a4e92433c1171ded1a",
        "0xa13d244c391bded31af5cf7cd9139ea0550ac829",
        "0x3f22eb85f1E82eDf7fd1Dbe477502f82B9b5aA9e",
        "0x20bDAf7432A516D6266dDf940a2A4A65C9051621",
        "0x35B307Acd97114607aa480aC971033c7AB5C429c",
        "0xc3D7929f79Dc912E6BE666908d0Ed957dcA967F6",
        "0x835b4485955ba8046231275318b579a1165cee2d",
        "0xa7e3Ca5CC8B86c9119479CC7C04423725eA8ceDB",
        "0xa7e3Ca5CC8B86c9119479CC7C04423725eA8ceDB",
        "0x219e2237FE500DADB8ce87d86Afc20789894FF43",
        "0x47dE54981d04123A2627E74e7f1F3ab1De8846e8",
        "0xC007bba1c5E2aC27675710c73C8cE453e60d9146",
        "0x41390223C72b569CD7212a67c9738ebc82818873",
        "0xCA48efb9e408aD55fe388f8161E1fCB6d4446f18",
        "0x58816a35a1371135f148BB4d8e8799a595b8dc4A",
        "0x5383Fc41ED11A8e35e2c9F92dF8928e8D71363ED",
        "0x1D4fc927FA33F4433d3B364673F2D9A1EE4ba066",
        "0x3f171f51EfA421258BA873A02756B70bc5122F8D",
        "0xB2d665d246f6341e5FF40Ad15b928f0976C3b04e",
        "0x0433ac70f082732f8b25b9b3E0F3FeF345B0c5Da",
        "0xCe4A299EC315e58e0bEd1287665D086e55EaDCcc",
        "0xfc7961846b3Aee3830ddCbfC8BA706B15e1770ee",
        "0x55939337918a1694D0377B230Ad794c77B71D2fE",
        "0xdB3A152F8BE432D7a1FbA295B1B487C2DdABD34A",
        "0xB4c8308907D6857D09e51786221F110555Efa851",
        "0xEDff43D0c77F8AfAa8f5dE1AA44a5D681CeA5a3A",
        "0x83733B1f93d397C9BdbF53BC1684b90594b19d2a",
        "0xD1E93e2b2c27D5d95f5085a3A043c84DB7f29686",
        "0x32ECEE7D20F191AcCd6721901b51c1f4B35ce359",
        "0x19996D87Abb2Bf27a2f3d70777214E1bB03269FD",
        "0x00C3670F155f2a0CA2b68882666CbA19d14e4943",
        "0xA5CE16539fA199681187202a90d0D6f2a2DB66b8",
        "0x1e4Cc2ADE8138fE689c69bB2F4068e4c3721F054",
        "0xd55EbF464f3EAbe8B576074EC0D7DF64A234758E",
        "0xF23F0e37C5583921aB6Dd5E3d7265b9aA864b739",
        "0xcc9D14ac395C0308FAF821328FDB12bE32a14431",
        "0x6d54B51494c43Dc1b308Ab32d3ccc4F262Ba1Bb8",
        "0x1Ee5706578bD0A5891A92E7F0A7FC646B52188e9",
        "0xF8Adb5Af22f51BC969d3481D122f10c2EA542BAf",
        "0x4cdc4804429cC7fEc17b59E4d21C0d6729696855",
        "0x61Ab69A56f196F728777eB7917F0f2F1F34b72E3",
        "0x3A7b7481501DA1f40834463244f49d72a6981985",
        "0xee117eD698F64AD38C3A3460c840fF0f81b05fB5",
        "0xB2c6578CA04f7243Ee165c631905fbAd716D5603",
        "0xFf46DdCd025284EC0703Bf57930202FDB7C17723",
        "0x15E9E61871AE5aAF73acFc11B55B0aB4DA95406c",
        "0x9913aa317c5aE11180773330e0c20A9d2FB95874",
        "0x0e50B1cDf00275859F6cE17b6f75D381c5D0A4B6",
        "0x2f03E5Ed1cC8860FA9365C0BC7A721abcfC4EEcf",
        "0xCEADc50e9e498E8D7BaFa52a977a9d058Bf6ACd8",
        "0x91b14234fc9AB21261c02A5D39C50074cEb66bfC",
        "0x47648C13eb7aE44495E68fDE8e1156237a37f536",
        "0x0f0FDbc88366b3E0BD3D7623255b00A8d60F9E23",
        "0xb1df57F46289298F58eaC0ab77274213E6b4546A",
        "0x4c0d9d2b34F56f024206f18eD6845A16FF91cb8e",
        "0x46fa4433dbf61DD811BaD56939bC52509B6aD00F",
        "0x8a4675Be6d798ef012D713ca78742C8E2C7F0985",
        "0x352045580F9B8347b8a1dEc4572f04A9653B8e24",
        "0x60D7FD4E89D9C03DC41D93499Ec7cC75c3918aF3",
        "0x552b51C5dD217035BEA61Df0590183c1CCeAC50c",
        "0x6Ed6F04d27797c1A006c39843e805B6a02800Aa4",
        "0xc953d2Bf81305eD62045F3F6339e35049Bc0752D",
        "0x6B3537903332ba4Debc76321348dD68377129e03",
        "0xa896c414030a8515091cd73691228036e4e58156",
        "0x4dfafd693b0be6ce8478ce4a37670375d6f13a8b",
        "0x13D3EaE674AD97034A641645A4DB708B63f0D103",
        "0x0C488De7b8e6c4C4e94693F3c56EDC4507E27903",
        "0xb973eEc0b1795F4cf7032FE13822c7ceEEa39F4C",
        "0xbE9Fed51cd52cd8d654C6CDf12A38A23d7E283E1",
        "0x96954a709df0d7a2d5aca108fb06f81b64e4febf",
        "0x7f823f1C08b157AFCfD8b7Cab364B3f95F1dA3dc",
        "0x74fB61C28900117F409F0a82432bd41c6F675E76",
        "0x36De1a0794dA925b9Ced5aBD64851a4BA6bf572C",
        "0xc9d922828887b42f8Cb62FaBCa22FDEE01d28fD9",
        "0x4e08C4C736bf32f4E80EB7Be101C6d722858fBce",
        "0x8a5b26fe0403baCc5e72dfB170d71abcf696E328",
        "0x06c30715D96B9e2478C03AF7b7E0E1B2B060E6ED",
        "0x310bA4aA9F8E98967EB814B278818acdE77F35f7",
        "0x6d3Cc77C61EF2524480F4420c05B8459EA5ce6DC",
        "0xd4BFCBd22d0793281D425e24dAbf804c40c84153",
        "0x738599AFba72AdB1B0Bd5017d79D9FC9c0b4DcB3",
        "0x8Bd679De872B40411E8A98FAd88C10e90c00466C",
        "0xDec92baaE1DCECD0e8AB7EA22B91F319EAAbB902",
        "0x3BeF3C1Ce431828604b8979356000F0c8a25BD65",
        "0x5537cf45A02AdC11d44930FbEe8D2E9679294C3c",
        "0xB637Af7d69a5c2893ACd29A4304B104f0b430B43",
        "0x96954a709df0d7a2d5aca108fb06f81b64e4febf",
        "0x576d67f28E41E071F523Ad26c6307c1D81640471",
        "0xC1186DAa679Ec4e5f1E6a57f30bA6FdE27BaDb7a",
        "0xA40115965d997207C6AA1A7d325C6C3d85b992Be",
        "0x5A8BD25E00a77478E4A5e9f96837a386B3aabbbD",
        "0x48969dB0736FC25F03710FF1bBF51154c50cB93B",
        "0xC1a0E355D2c11c037Aa0C79f23E1502001760850",
        "0x6E79E6E157f55F9C3e5e01E805c13E037d49C4Cf",
        "0xD83A922258210BD8960D8bCbbc369184151d950f",
        "0xf902D10208cFB45C7B302Ec40d2D3Bb51DAeAf2c",
        "0x7a0A9Fe9bB09f53D99c40C4B764789851589DBee",
        "0xb180b19e228fb1F18b60d290fe9Ca0bB75c5a543",
        "0x5C30641fB7d6723D15065794608f34536a15a7E2",
        "0x2aE00dCBDa0937dfdCD6CFE565b6b3cf0F63Bd2a",
        "0xf21e178a90fd9f14f2437714244bfad399764a47",
        "0x61C6015f431A4161359e51d97992567859163876",
        "0x806b3F38385BED1253B515A3bf22205f0c5F45Fb",
        "0x8E05013615329523e46b6170ce90AB49371BD89a",
        "0x970A19ee71A7FC22B7e07da2FD1Db9BdDFB535E2",
        "0x5b3cdc7eca8e0e170cdd97866d385dd3bcba38d9",
        "0x8AD36DeC0118bCC23CC4Da53235D50A123061BF9",
        "0x558c23BC2345fa468BFC97957CD5D01B47C11F31",
        "0x5C12B6C0D0Bb8Df0C13728D9ef59A76F4e272C4F",
        "0x72983078dde0C27A39d1FB978Bfc02c1720D72A1",
        "0x43803ea74fEaFeC049ff862d89370646C06b11A3",
        "0x533e112Ec47deaDf51DDe318AF5Bf3F77d18A7a8",
        "0x2d1B6BAd00e125412C91a2Ee4c9b4a706ca1BF1E",
        "0x0b28418514F6b6B631635D1B168dE5eD0bd601C9",
        "0x8E05013615329523e46b6170ce90AB49371BD89a",
        "0xc903B018b5A704467a2E6F5b51936E463755b6B6",
        "0x786824DE170d9d4A98728C1d5634543cDdd50ab6",
        "0x6B3537903332ba4Debc76321348dD68377129e03",
        "0xe14748C7476ad44d92E8c86A17aF2922803356Aa",
        "0xebe710501F45A8e32F597Af8aFC7BEbB879667c1",
        "0x8D837c97173c060e1075Ef120C8680D0BdeC6aa6",
        "0x6fF75E8E6688dd0E3f4b60869345B7C9230F96F4",
        "0x96E19e2DCEcd1B9B2DC61B83520d29f2a30af7aE",
        "0xFb5e8B158Cbc09A178e2e2895415430A081C7e19",
        "0xc7Bd68e2f7771bD525F6060fCA507E8A4e3B7a9E",
        "0x6Ed6F04d27797c1A006c39843e805B6a02800Aa4",
        "0x7D2d8d0A535823865e8BC19480f8f8039b77f7ad",
        "0x92662DCAa64Ca01A07528997346E93dd9E5E66ab",
        "0x13B20CeE0b79D9981C7D1521dA1abC22A669dF55",
        "0x98B208Ca0ADD93e28E41B9Dd9c61f5C651d514E3",
        "0x0fBd1b4ac2F25E483DF6Cde529e0F3d7b3380E12",
        "0xEa3D33838673c7538F0A4fBFE09E2A8BeF30BdD9",
        "0x4364d10809a0884Ec6B3b0345138bE1572eDD757",
        "0xf899a587844770A501026541FF1C730EAB3f1745",
        "0x91d2439f60Cdb4811eD6E2B36Cd6B34959F84172",
        "0x80Da61D18E5aE2F5c390c05bf22BB3461a110dc1",
        "0x784A20D0334369c5f9f6E8Cb5E643dC0fA251878",
        "0xdcDC9f402377Cdf6565dAca2B97d104709ee7816",
        "0xa0bb699beea54553bd97a20391b3e2a6398fb466",
        "0x0D96bcc4bC6c7bB1161e57B49fCDb1127B7c7f33",
        "0x88C22FCEBe68a78aa77e87af49dD11d8F89E70D7",
        "0x7dB269A760a9C073721e612131742F889f7ED31a",
        "0xB49D263432aABde1f0d97b44d8795282B3dF66e3",
        "0xb61044c7be455aa5b8de78c717373ea0ef2b45a4",
        "0x08C84f46dD3AC14aAc0ca2C8cC5bBaDA4d376CbF",
        "0x1145EEcB7E6a5495288c6a9806E330879b398666",
        "0xCBe58A3102D2B134d2d80Bf045BFc54d0823283c",
        "0x5100c125CF338F65Cf51C0B12DDf170a5a213fD8",
        "0x1248E8091170aA82a2e826c7d183Afb04E4778e2",
        "0x00D0cd6B14d8ceC34f94e3a05aA7F899aC8758A0",
        "0x6e018AD107e2063fdf7137fA4C823e7Bcce7C1FD",
        "0xBE491f37c23Cad9bD8A5BE1634D83b00bB4D821c",
        "0x78FF545581418825d51196A1DB2e595bbD854Ac0",
        "0x2AfbA283324A65b64bbcb70fFF9165cabFa5B87A",
        "0xB0be6fF8F25495E0f72628Ab5955768C334395b3",
        "0xc41ac9834D91a60f2560b3aB94460c8E874bb3B2",
        "0xC5e68D3c3d32A132897dCB1AEF7C6750c58Fe007",
        "0xb61b8752D4718BE731AC96dA91CcdB0206B6266a",
        "0x61C6015f431A4161359e51d97992567859163876",
        "0xbB6811F776fE2742A4a55C039F2c6264326570d7",
        "0xF10939C7529461432bba2967e86820e1D35f5946",
        "0x0a20F76999c097Cc0Fdf557a48be91598b342B71",
        "0xD3921A48B78B9DEB5946DcA8d6b0a92a3847A837",
        "0xf411c691c130160c22796e95a4d7c9c7396a1104",
        "0xbB6811F776fE2742A4a55C039F2c6264326570d7",
        "0xB0C2E77b85FdbbD4B4D8AD61AEb6DD8D64e4F61C",
        "0x508fbebc01922754bb98a2de9cacc6ca3a29b3e3",
        "0x6fF75E8E6688dd0E3f4b60869345B7C9230F96F4",
        "0x89CE794D2B4079D202C9de6a62c71C11193BE9b5",
        "0x2a0C7667A873D09Dd059b88E7311C3AE2C33AC2F",
        "0xF03ec7F019Bbfb25785329937331155189043c9f",
        "0x19cE0EFf17F31E38f279B7C85134E3E1C71AFFCA",
        "0xa26f794E5c344cDecB8686Fba62C3dC241D3D752",
        "0x0C488De7b8e6c4C4e94693F3c56EDC4507E27903",
        "0xf75df2C072B12a1d6AfB847033c86fDE64B81f5a",
        "0x5e25437f420b443335b0ee8565a18538401ea7f6",
        "0x4c0d9d2b34F56f024206f18eD6845A16FF91cb8e",
        "0x922c11EAB03A5a895b2C7c7F54da8205B9d1Ce78",
        "0xE93ebbA4Fe042BAF7f84e79f90ead187Ef5c4e72",
        "0x14978319ea52fd5F4cffEe2BD9301e03a0C12Ca4",
        "0xa025Ab1284eB70a74008414b4A81eaCEd46a12a1",
        "0x736Bd9A6F1998C7AFB2f3f3E595ae00F64bcb930",
        "0xAdBA3C3e04F77123e00cAB16FD1b9cD3cCCAB4aC",
        "0x3D34BD7382b63118C19394C7CAe4d6E5b7E54119",
        "0x317921Cc525e50D264C89Cf0DF2e507DA997a85B",
        "0x74C461a33220154D092338D201bd5D0039Bef61D",
        "0xa8763C7A030D5db6041aC383970512E04cEC33e5",
        "0x444c42d401233786dd6c0bd9c6d3e2aa563fd91d",
        "0xB2A2EdB0DC577626fF9bFe6c8D87330FF19Cd8De",
        "0x3f5E5a705d1be5e34A1E38C27E461253Ef57d902",
        "0xf721479C801F1B8231cE5AD10aced16E5d942A52",
        "0xF19b0581cFA9f9Ed23b9a76aEfc4028F6A9a3E72",
        "0x30d9b39A0ce38E251479d1deBCbc63Bc3B68605b",
        "0x9f5f5293392eF8413F90109Ba9ce7E8868baD314",
        "0x797007c4c81b9ea75370a2c1f6cefcdbe2eac9c4",
        "0x8Ae2f6061dd2dEAbfB1F5062220Cdb7e6c5aDc87",
        "0x21ebC78009189987c5d5B4d68C0C0D5Ee011Ea51",
        "0x9E9081ea7015456521ed5Ea4afDE617bBF463e19",
        "0x784922c5e4178F8d19D956E6c7674EA7c93Ea76d",
        "0x5A1E0b6C475DcDc62a5eb6B8711f06D29f221268",
        "0x404c55FA83be9B1df524078b32580ab5DCefb385",
        "0x6a0208dcbf1bb2cfb6b36ee0e7a5d53aa8826f91",
        "0xD7272f37e384B594e885237aa29013cB49295e14",
        "0x6D75a16a457825cd8279CE4d8D475eDA43186535",
        "0x93C31a7B5EADE636a26E9A1A606a3eAf51119A85",
        "0xfbA130b886427856584e7Fd14a4f00358E72e581",
        "0xc6F681304341C16B7d4d450c3f96Cd1aF2eA6a3C",
        "0xea0a69aDD6f7c7163C8E89553350b7068a5d9A29",
        "0xc9af7178d26eE9F6DECfEad9d7e3a01424A06Ee7",
        "0x1483C6Ce25641dbc25f80b3F3aE5ac0ef3A79bce",
        "0xaD84da1D7fb51ECb7D7e9cb52ef9446b6e5840d4",
        "0x4A37C4E2D808Ff3bb680eD655e888546e5428a26",
        "0x7A06EF02fBD349179F287EB8377B22196B7D9C02",
        "0xc953d2Bf81305eD62045F3F6339e35049Bc0752D",
        "0xbF2d3C3aa774FDeD25216b02Ea9a24bc56E49Bf7",
        "0x317921Cc525e50D264C89Cf0DF2e507DA997a85B",
        "0x0BEe1969211198125fd324C9FeDc34473c5F7e5a",
        "0x382DDc750823FDc16216faCAbc61991A787EA453",
        "0x436A0261130fE0111A9e83f7d2C446382094262a",
        "0xa8247ddbdcbc3277da28e7fefcaa147da0d66242",
        "0x00D0cd6B14d8ceC34f94e3a05aA7F899aC8758A0",
        "0x3F38FD15b1Ac453410d8D55e0Ec6696E70BE93a1",
        "0xe5301189e8574Cee4a46780ee4F2837A6966F8cC",
        "0x508FBebc01922754bb98A2de9caCc6Ca3A29b3E3",
        "0x9C5fC3117C013A9EE29B64a27BC753Ea1EB8EfCD",
        "0x1B9d5b3888ce80c25f27D61c6058e9dE7d4f0118",
        "0xe273c3E3C92faD8713fb6377dB35C5836ba3A93e",
        "0xE6071B93644143A2Dc3c0872E125b7d6C4938Ec5",
        "0x5209832d6F523b1e0009A4cCAa75BA390F7f4812",
        "0x255E8458a434e90b636ceB2cBb23D9aCF8E6C037",
        "0x30d9b39A0ce38E251479d1deBCbc63Bc3B68605b",
        "0xB1d61a94E624E9Afc2216675F4Df42a7e3bA52Ce",
        "0xDceb4Fd5b8667F1CB2919a9e66A767c65435960B",
        "0xCCCA6CF8903B7da7FE19E10972e32Dd69c70559C",
        "0x1E14E99F1736C022a64F810611BAD6DDA92342d9",
        "0x829680835bDF7d1a333b4Ca64626B91331412ee2",
        "0xB18fAB07ca91aaD7F37502bE9823b63C43B3F136",
        "0x8C9A5a7027331F70786D55848F9A1E874837715a",
        "0x3dF5F5C21E327bc10A16b800602EaE7Cd0c5702B",
        "0x5049b8218E4670A335979B81c3faB1f4E0e76f9B",
        "0xBE491f37c23Cad9bD8A5BE1634D83b00bB4D821c",
        "0x588A6eF6073b297EfF7d4e175aFF0414aE85b843",
        "0xEFf5927D4C8788901cCf2C55374B361E3ACBb4f8",
        "0x542726357a133069e26DBE96930Bdbe393cD843C",
        "0x4a34e638835F65d1a2dF79E9AF93556DD009278a",
        "0x44e58743F9855C9bA574B768e8EfA0338A009E03",
        "0x786824DE170d9d4A98728C1d5634543cDdd50ab6",
        "0xF8DB01F59d0cAa15067156fF7Ed786EAF207753e",
        "0xDFa47Ae9612FEeB3D8a59e9c3dc7246284b5ED19",
        "0x41C4DA71429C9a156Bbde925949A2842DE98c2c5",
        "0x452eb1C9Fa394B73FB8dAA38401BeE7824251b19",
        "0x41FE1fC198bD6Aa7826f57b8b59D3B73833938a2",
        "0x51882e96F0693162F2b72e495Da8E78c2491A8Fe",
        "0x81343Ae4a41E12CDfd7c72b9E65202e162058213",
        "0x533e112Ec47deaDf51DDe318AF5Bf3F77d18A7a8",
        "0x429206Cbe076ef44ae584d7962b6588AD408eA90",
        "0x212d0945FAbe82A312f0eA6c61A50b4d66897029",
        "0xeC0c05aDc4256926fC5247cBFA56f20d2dc65806",
        "0xC392CE653cD616cAD812315E3d111c00b43f517D",
        "0x88C22FCEBe68a78aa77e87af49dD11d8F89E70D7",
        "0xcBae96D4c8162B4B7E4BAf9d87D15a5a0Ec089A0",
        "0x4cF45fb732846c1D28c44f0A2b976c299e07FC60",
        "0x8e8cB3A390ec055E438befaB51cbD973c4229Cba",
        "0x6daf6bB89d96B4FF290d6075ef2E9FdE58B7C4b7",
        "0x08C84f46dD3AC14aAc0ca2C8cC5bBaDA4d376CbF",
        "0x8082dae9E758d9cf76c17cB8edFFF8b1fb312eb2",
        "0x594df5A5A8d91C85aFbb3c4b002dd8F632f8081a",
        "0x59B2fEd5Ad20740043A41A4D1065994af5b8e712",
        "0x7cDc15EBa13609A244e96b6b9e4C4a95f81ec953",
        "0x2F1AA64A85c2f20D227f9736Bf34aceF985a4175",
        "0xa76CE76F1AC91f6aA470B0d1fdD33786FF893271",
        "0xdaDE344a488b5d0bA921FE953e5d8Cb9024FA210",
        "0x0bcCcf68faFE41b5494d7FE81Ab018a2A2C06843",
        "0xCB3ef9D1BDC1c5f4d19E1c3441df72bb1CD1FF76",
        "0x2388693c321842e2DcFdE252999E49f1d3EED79E",
        "0x8f3c62d6D0E4Eff178110248c8d263945e9f61e2",
        "0x04914d48262159761FAEC4104629Facb2E0419cA",
        "0x2c29010DE895807649cA2763c510E416618C3F8A",
        "0xbAf4E19342F72Cf2f0aF8E89117c10C1031086B1",
        "0x7A94100bca0B4Cc30e95A8108f52D166F5Defd34",
        "0xd0aA4cDB7d475963C6a65b347dcF02Fd15b1b1F3",
        "0x8e39F08241EB505F8d88374A54e5030957B65559",
        "0xd0aA4cDB7d475963C6a65b347dcF02Fd15b1b1F3",
        "0x863004Aa0f46827A0028F657139fE64bb2f3dEF1",
        "0x8082dae9E758d9cf76c17cB8edFFF8b1fb312eb2",
        "0xf75df2C072B12a1d6AfB847033c86fDE64B81f5a",
        "0xc953d2Bf81305eD62045F3F6339e35049Bc0752D",
        "0x73C1dD4e9132Df08d4F968E9c170f72f10E4CB3C",
        "0x0474EF727CECA0Ff3f260AE836a91071B56260fD",
        "0xeA2b75A072A94CD17712831428b82A8537066906",
        "0xdF1A987f71015d867dBF169aCb59f5538Fe174d5",
        "0x63a2b599E1a3B2A7a0BcA46c99E66EE4cCEa2598",
        "0x48Fe05b6A9c0a474893CB85ee96c13743Ca08993",
        "0x9e7467Ce4109BF2E74c6714764aa7746B1FF9Fca",
        "0x9e7467Ce4109BF2E74c6714764aa7746B1FF9Fca",
        "0xb9aBea871234d10181D82ad160BF56A9615dc821",
        "0xB449b09B6a5F0476Aa54fC2227112AEf5435f5DE",
        "0xE1134E0Df566697880698807C5C12C963B798785",
        "0xD7cc3bF48BF9Ef9A345faAF7D880FD9c35B7C67f",
        "0xedee171F43F3E81170f21B3Ca67F28b460dc6fA4",
        "0xfc7961846b3Aee3830ddCbfC8BA706B15e1770ee",
        "0x3a18f9cA35dCB59991895eD613273A150656C536",
        "0xdF1A987f71015d867dBF169aCb59f5538Fe174d5",
        "0xcF481e1B8fF14ee4c7b075ae9C86c716e7764bB2",
        "0x52Fb42bEeF65E35167E755dE8C63CE30B1e4f642",
        "0x8e8cB3A390ec055E438befaB51cbD973c4229Cba",
        "0x3e6F8BD0757e5558B6835D7693d0109De18E345b",
        "0xef691330Ddd20ec7675371a700CA6f526Cee9187",
        "0x310bA4aA9F8E98967EB814B278818acdE77F35f7",
        "0x44E7cdD87E5B7A17e5821E54C185910DE92Cf22b",
        "0x199077b9BaFe1486Eda1fFdC6D3BdcaEd3FB3457",
        "0xaf4A11Fb5D389EEfbC277AA6D4d3D1aeeD1013a3",
        "0x462F963c517f19Ac7966Db3570941CB28bf430dB",
        "0x9E4D00Acf983AAc4fD8b1041F188F5E4dea121ED",
        "0xD1003083a3456f88092C082A7060364f1c6676d6",
        "0x8c1429c28893A1E4B2e0bece3dEfFAA09665FFe1",
        "0xD239eBD5B09E951CB7489e65D872bc0EA21c072c",
        "0x3FBc2D70f6A8A16A55000e16046bE70f1442274c",
        "0xD1003083a3456f88092C082A7060364f1c6676d6",
        "0x0531571e7d049d11BD570D3F8558577A20d6092A",
        "0xaDA5bF594E9AD25A424ffd154AC3d40039094d19",
        "0xD239eBD5B09E951CB7489e65D872bc0EA21c072c",
        "0x52d7d807dE197be7EeA0b47dd9541f2f0EF6492c",
        "0x1Ee5706578bD0A5891A92E7F0A7FC646B52188e9",
        "0xebe710501F45A8e32F597Af8aFC7BEbB879667c1",
        "0x3f22eb85f1E82eDf7fd1Dbe477502f82B9b5aA9e",
        "0xf5dEd27ffC1aF883244517710e9014420ACda843",
        "0x7eF73b47F248628256E810C947D835DB42F6dbDA",
        "0x996439AAD103988C9F9f56530a5Ae286D84814AB",
        "0xE91896e1ab24dFBA3c6c914Db386b830A8eb0936",
        "0xce00dfC634441D5b28676De662A3C3AabC82a567",
        "0x905BaB133de09E0E9362183A51d66b5B0BA13390",
        "0x6F8bCC4a3741a329F9e1fB6BedAF9E0efaAf23c0",
        "0x5B88201576CC544ef827eEA803a0ec96a125B305",
        "0x77907F602cCD76591e3CB6EDD346234C391549E7",
        "0x9b4031ff0f233c296cb47e6803be2812bf3cdd51",
        "0xb20DE2DB8eB51424E408838B999AA19A92585d4e",
        "0x2A4281B141ce8dff3Af877420376e71c7E53Eea1",
        "0x27bA44f45fcb6eBe84c8Da501F36a4De9Ae5444b",
        "0xd1b8817b0dbb056ca7614cd4f5be59a5650bca27",
        "0x137EBef6F2E543695110c03944227C28f88c19a0",
        "0xc28D745CB975439c0FB25bB3090A43714cbDD01E",
        "0x32eF07d66DcB3167f1d195c08dbF634EEAF616DD",
        "0xb5ffd6cd735bE02d0696D02C327FAEA6DDdc00e1",
        "0xEDC3b9B89d7640fbB3a9bC0A1c89D8330981D536",
        "0xffB675361041032B62D3167ed716e792B33d0F4E",
        "0x9ead094E09Fd913e82b4754ccA79950a6e636ee1",
        "0xda3548b8b8896845462ecedcf87ba445ef971542",
        "0xDF72eE8CEE5F14E4C30C0685E12fb04241aE9aF0",
        "0x61C6015f431A4161359e51d97992567859163876",
        "0xD3aD49c87974897FFF07d275dC4e68afC999afea",
        "0xb9aBea871234d10181D82ad160BF56A9615dc821",
        "0x7047ed35c4c2C89360616cB13a42F6Fc378A404C",
        "0x3F71AebfF20bBcFca80423c4CceF720ABCdcEEBb",
        "0x462F963c517f19Ac7966Db3570941CB28bf430dB",
        "0x5f20F03258b8C7E73B7568b7aA2dbc8c3dC001B5",
        "0x9ECA3CF0173B97d03588145Ac954F9e4CEda4a71",
        "0x063A02684dE5EaC3876E8BdbdBc682A06A4Abe18",
        "0x83579a32cf3f4121D76E6fF48FFDDD4501112720",
        "0xF19691D0974eAe2968208B1B1a659a2c1329A46A",
        "0xF10369ce1B24bf4FB5BC425F7F71cDBEE978A04e",
        "0x49DDc1DC8300fBe0E929F3e7A672Fb782a054b55",
        "0x29bC6c8D87D75a1B0D30BAca5088723991fFfe82",
        "0xF10369ce1B24bf4FB5BC425F7F71cDBEE978A04e",
        "0xEdC2d7Fe283b0D4E9E9c37e1d94928C52F69694E",
        "0xB39cC757d40F7216Fa148Cc33e67F134e6542cea",
        "0xC4275E1bA75531405F1126883C7834fb686d1212",
        "0x18eDBa658e9e3Af83ceBE18178d6A779382825E0",
        "0x8B630681A74e98778b9Da31FDa1b72d56Cac93EA",
        "0x85FE64C0BF8623b9C1c21010bdF642eD714bE00b",
        "0x8B630681A74e98778b9Da31FDa1b72d56Cac93EA",
        "0xc41ac9834D91a60f2560b3aB94460c8E874bb3B2",
        "0xA0E37a1DbCb034A54e9d0f0B11b0e83a67523cf7",
        "0xEbb138a43ae6a24B92A4BD5841240E2F207d728A",
        "0xB39cC757d40F7216Fa148Cc33e67F134e6542cea",
        "0x74C461a33220154D092338D201bd5D0039Bef61D",
        "0xcB82F416B9e6Ceb8593F796aB2604967b614147B",
        "0xB8982aAcaa62923B52ad8dc2800F7488d792692E",
        "0xF616ee2B9F02785D9f94bBdeCa5eAfc5Fd7314d5",
        "0x7d77953c00B6f8416dF8a522Aac54a449c8E45d5",
        "0x9596611D145c618d5DE85279799889fFfbA3d22b",
        "0xbc7Ab9Aa00939D2a983A380ce052c1173dFd3AC2",
        "0xAAb395fF29a3Fb0f3224507Fa9095CBbdf0d401a",
        "0xB3C34933c7fa48fF61B55e3d14021eF836e6240b",
        "0x8f3c62d6D0E4Eff178110248c8d263945e9f61e2",
        "0xC593aD95caaAc10b09f82Cb4eC46ed1E92A8fC44",
        "0xE9f74CC6B081eA4E3E100Ae6f6e5024d62003F68",
        "0xA782B6Bef56776635b9e24Cf4BCB03c6cFfB876E",
        "0xb615EF6F977175cA935FfCd58D84322bDc741365",
        "0x8B630681A74e98778b9Da31FDa1b72d56Cac93EA",
        "0x6F8bCC4a3741a329F9e1fB6BedAF9E0efaAf23c0",
        "0x2520608F87D009fde5ca801EfEBeF52B891459B0",
        "0x9E4D00Acf983AAc4fD8b1041F188F5E4dea121ED",
        "0x6F8bCC4a3741a329F9e1fB6BedAF9E0efaAf23c0",
        "0x909222bC6b00be6b513dcC02f4564e1d4f7B03C2",
        "0x2F33B169cbDfC30cfaF704E0bc5871fAF9053153",
        "0x0d14D5553DA2359Fe859f39e273AF26ddf6c33ab",
        "0xb615EF6F977175cA935FfCd58D84322bDc741365",
        "0xda3548b8b8896845462ecedcf87ba445ef971542",
        "0x231dc8060cefb70162112837b9c92d6cc5492888",
        "0x063A02684dE5EaC3876E8BdbdBc682A06A4Abe18",
        "0xD1eeD91b8B7453744FFdd67F125e462Cb20a8F7F",
        "0x063A02684dE5EaC3876E8BdbdBc682A06A4Abe18",
        "0x998A442fDa19a07302306F10e897f6db083c368D",
        "0x760491756AB8C234245ab0524e74Ae94560122cD",
        "0x8D93f0ae4249FE45B9cED6dCCbF36c4e3bBABb85",
        "0x063A02684dE5EaC3876E8BdbdBc682A06A4Abe18",
        "0xa5C185be59083d747f341A49a30b595CFc97bBc7",
        "0x314D90f048c0C85fC86227F603fD0531a870C23f",
        "0x4Ac151235cFde3579044778823D45a2c5c8A4618",
        "0x14D23b31DfA126eEb6D113Bf40d6536D1D93DfC4",
        "0x0e60005BaFb82BE3Db2b0Ad37376E58194A91901",
        "0xe13fB60499e43F803fBF1d28017f8540fd7f73a8",
        "0x0BEe1969211198125fd324C9FeDc34473c5F7e5a",
        "0xe212004290fa1df94187f6ec77c9e91ae40ec903",
        "0x794439CB9818Bd3caaE8558EAf9EECB17C51B1c6",
        "0x896de1B3e6d6f4d5cC3D087B922bf829f5f3C7eE",
        "0x2FA0b18761E47E95e0E0d62aD67194Aac09735d7",
        "0x995D697ac37916b79a6a00E07E2Df07BdCa7c1b5",
        "0x20a570eBAeEed33F20b24ffa639D3f1dF2F4B878",
        "0xF9755f34BCD370b6ba5783942d55B2f02C5649F2",
        "0x760491756AB8C234245ab0524e74Ae94560122cD",
        "0x81f0507489BFdcf1ca5bC38bF6e91FC463503510",
        "0x8F0edD8aC7CE19c7b3d04D9Ab6489e35913Fed8B",
        "0x1972Fbf677D143b8cB249c4B4338f2E8d69B30af",
        "0xFa34e68cF82C9Cb6d1AB2690887EBDA037d6E3CB",
        "0xeCd792894227DB4796D1ced087F2DA9d8Ae0774a",
        "0x8ce0Fa2728d06A0238BD3503C2502D2B420785Cd",
        "0x508fbebc01922754bb98a2de9cacc6ca3a29b3e3",
        "0x7B2D68591a6c21F2219180dcBC4b813eA869dCF3",
        "0x0f0b8cda9b8e0a4783d50e27f79fc1cb2d889356",
        "0x338566F5c19BB0Fb1FF56CcB512d3A55487556d1",
        "0xf208A854d8dd608Ad95644e7ca3A59a31aAcDE9E",
        "0x045038Bf26b348A3be6D4c71358428ED81000383",
        "0xec2918A90931AF1Ce3F74d09f5aa5f403bd620C2",
        "0xAae63373Af79E5d247426dFC3396dD5098D994A3",
        "0xcCc23700efE72427E1040F9ab4F2fD2e11e1686b",
        "0xf79B892399F14C18cf5cdE328EBBE1f80EE0c230",
        "0x73eEa85b44902903E2f25D5dfdfCDF36468E7255",
        "0x5D0DA4a0120D4db65BeCc3a4FFD605196242B59C",
        "0x6A29578876c41C890186Be491f4c179306748d9a",
        "0x183Afb27ECcd906EEC9C17Cda60E5C9780398f5a",
        "0x36834AFd890307468bB136bbF163A04C71791410",
        "0x4f88345ECb82fC52A9B379c69A906583162034df",
        "0xa1a0Dcb3fFcb87De67567d04406F47a308cC5147",
        "0x429aD3F8cCcda4d94D209e897395f0CCdE5dADB1",
        "0x97475C246428408Faa564f1bAe1558C9Cdd148ab",
        "0x6C518250335Bd852936e6a6a77BE3F8305e81406",
        "0x2E4719e622f4f2F0332EB84Ad6d1D2d91Ad6bf23",
        "0x8E2189Fd6882642B5df0646eC8d57f7462637B7E",
        "0xf409ed08Ab8cdB3Af4BB8823Ad5562D674cef420",
        "0xDe95988D5c5720A2f48da59119f245418F075B5f",
        "0x648a03bb7155F398F175b5CaD4c55754B6d43f0D",
        "0xA45ca4ea109bf69B12b2A071F4F6Be123390198A",
        "0x905BaB133de09E0E9362183A51d66b5B0BA13390",
        "0x32ECEE7D20F191AcCd6721901b51c1f4B35ce359",
        "0xEa62acA0F7360CC0c7774F1D623dD8e9B8d547F1",
        "0xDb5FDfF16072ecEB65D5FD792007b6B1aF0b2aDA",
        "0xb5ffd6cd735bE02d0696D02C327FAEA6DDdc00e1",
        "0x05cA2Cf6D4dd19cdd8A48bDFfF616F587a86D913",
        "0xAF1f30C8D8424E503d8d8d5DC464B34a1d594C2E",
        "0xC7a73D629A8667E1e7DEf6C8f9384d0332d7425a",
        "0x2520608F87D009fde5ca801EfEBeF52B891459B0",
        "0xe3527334a0139b6c3C65aeB726654FD592900D75",
        "0x4946386c150E0D1f1778B2c6Ae0D9d58B2aBd39b",
        "0x7B3Cb09eA906BB1Db6e48261949a2231BC30485F",
        "0xB84174cE1b56Ac70BF812ad50b23559CEdb0da1d",
        "0x88552cc6992a0230017f0c78e50Cffb7E40754F3",
        "0xbea8929206b0e98f510d4dcd00b11331204d2ed4",
        "0x5dD9eC5972C785E1c1Af65ccb53aD0DDE99A2C3a",
        "0x1524D8eB6F89251ec3DC741FA4eFb03e17A94266",
        "0x8E2189Fd6882642B5df0646eC8d57f7462637B7E",
        "0x336A3993485AED933BBa660C4e4e5c6d45D93afd",
        "0x35f1abB62C995D4B038f8cC9389eBE86CFAcEA80",
        "0xdb6492E4d0E31D7879D93e4fEEA7C00E0CB01e47",
        "0xd04e63A3Ad368010f49A87927962A9f1490A44CD",
        "0x29aD5DAD45527Cf0f9985C7a3da7B980990fA18b",
        "0x183Afb27ECcd906EEC9C17Cda60E5C9780398f5a",
        "0xfdb803D417775E64D8f81cB300dbCE041A380d54",
        "0x21FE8B035b11FE06f71BC0bff1d30056c8674Fb9",
        "0x350bA785DcaC1d0c272503FcE5E367b6E5C9fC38",
        "0x83F8e2284ed0018553d1E9177821b83e9566fE28",
        "0x3ABBB055B007289107EC30d06adF667E9fC4Af7a",
        "0x7A94100bca0B4Cc30e95A8108f52D166F5Defd34",
        "0x7A94100bca0B4Cc30e95A8108f52D166F5Defd34",
        "0xcc9D14ac395C0308FAF821328FDB12bE32a14431",
        "0x7242d08B162F0Aef5859603F094CE595b163c5E4",
        "0x8a32A0cf5A5d615d5858Da1BF63a66985D8CfaE2",
        "0xB75Da2fcd6f078946Ca8ee404b57Ed8544a1c880",
        "0xf95e5BcaC4E654D80FCfD555710cEAA30D6A6a21",
        "0x88e43A1096C85CbDb887926e126B51ba8e533Fa4",
        "0x403126b57a2C25EC59A91C3a8C93DcD921244164",
        "0x7b81a506a2df06603427c5421126f28a2a165a8c",
        "0xBccD2939b0389A2e76A133241d84e2F808853D2F",
        "0x6F8bCC4a3741a329F9e1fB6BedAF9E0efaAf23c0",
        "0xE184025b3a09a179f04186EE6e9d17eF3a026650",
        "0x97b0a1D4cC4C55C620b3D429b0AF46C39cb0f144",
        "0xdFfDaA3f1E8B78f50AE17d678a96Ef460a59b2D1",
        "0x648273Ce2b7aa724586C5E7f336383EF18BFE51B",
        "0xB670B94Dff4E278A47139E2508105b83810A796a",
        "0xA64E3C6Fd5806533291C9A7f9D42F65A4014DbBE",
        "0xbD25B145f362D882765B69654d9599B89c5B2Eba",
        "0x29110a36815bc3bB84F97C36d298C85c673a4d34",
        "0x6898616B4290a77a193Bf810396524f082786Ca2",
        "0xB70958Bb1f150a0F0732f35497d8Df0Fe1e53ba9",
        "0xfceFe744556b445F33eA05050C8C494EA7cF2cc7",
        "0x548eEA42BC5CbD8dbB6c997C926759112576Ff06",
        "0x548eEA42BC5CbD8dbB6c997C926759112576Ff06",
        "0xc342165762851c090BD680387B7CfEB317b7637B",
        "0xbA25DDe0E0814f0bdee6cb0CC2ffFE312B871c89",
        "0xd9045a6805bA599a1600e959A6b2E3F03b6088D9",
        "0x8C7722278925727eA4B0Ce983250f5fCb3aa564c",
        "0x245033e1FFe6f83E9705eE9B5aCb28Acf2d13AdF",
        "0x2438CA64B78Ec253C0f023b1FE5FcD5431E5C5B9",
        "0x43ad5a98D991775F40c3b1808042641178E4f938",
        "0x88e43A1096C85CbDb887926e126B51ba8e533Fa4",
        "0xd5e7e8A84f5EF2FFCFcA5e7794bE65C76cFF2A6C",
        "0xA64E3C6Fd5806533291C9A7f9D42F65A4014DbBE",
        "0xAEB87e68F40b67d639CBC3d19eD7F99686eF2375",
        "0x5c019b3Ad19700a6c9881b09823026DA5C7092De",
        "0x5c019b3Ad19700a6c9881b09823026DA5C7092De",
        "0x7ce7bcd0b58ef91be3eed442c1c2b87ba62f4314",
        "0x8397277D9256eee84f250c7d958F3abB335d56c3",
        "0xe60ccbd7a23561c8c618ba0589fef0936bf63572",
        "0x8A4B4D70FB556700c35D83DCd3eB184d91660d10",
        "0xcDc7Cd56B4668f2235bF9E0c786A42B3a7dFF4a1",
        "0x1eB86137AD5aD103ba95e6B0C989102C5a577E39",
        "0x73F4733DE123E16b80F457638011BCdbE83b1a68",
        "0x3c063Dac59d89C5A5c09736987465d3643B9c87C",
        "0x8578d451F9B652b5483340F2f921B70A37A6c196",
        "0x9dF1494eaB95789269713B6b40aA6630a683e02D",
        "0xE695C17e93ad91a2d09D50fD063c0F3806edd7e6",
        "0x4e08C4C736bf32f4E80EB7Be101C6d722858fBce",
        "0x6918aB7661d5faA69397Aca1a14b34584Cf3947A",
        "0xF26e919212A60260d273baDD2F3d2703c83C4C3B",
        "0xFF8DF12FC7DEEBD0E703AfF1Ab54BbD64E2a1270",
        "0x35619bE571617F64B4C65Bb012761A02373992E5",
        "0x2dD8fb391780943e6A121960503383b24dFaA4C4",
        "0xBCCb080b53F6E1C0Cd4Cd9c14b3D831968E7Bc99",
        "0x95A8ECbC2c941BaA85AB162442C5da4F4ee2EDbF",
        "0xE270d522a338dD4828f6e177084fE5c01ADffc93",
        "0xbf65e93e354918cf5954d8b5Fd922D89d7258d20",
        "0xb462b634B076bfDb220A27A44a6d52812477dC9E",
        "0x761AF56E6208E8E385Bd434BF1cfC040312Af279",
        "0x9e7467Ce4109BF2E74c6714764aa7746B1FF9Fca",
        "0x23F8bb63777a6CdD6103E5b5B72832360edE3BEe",
        "0x88e43A1096C85CbDb887926e126B51ba8e533Fa4",
        "0x5c019b3Ad19700a6c9881b09823026DA5C7092De",
        "0xd2Eaa940E0c7B8F08d4E8e2FD4948E9a0324bb34",
        "0x143627c667C65ACD7a67143A1E6fb8DC82A7D4C8",
        "0xcCc23700efE72427E1040F9ab4F2fD2e11e1686b",
        "0x0c63EC635Cf396046fcC68e50782986dE23be52F",
        "0x56757A41e8881D20f066896e89faE69ccc9169Ce",
        "0xFFfd94198604CFbF94e4dbDCD5f26e86Cfec6496",
        "0x70059f272d2B9E6eC87f70738032E4d0DaEc3320",
        "0xC3eD0878B4EA27C93eC520AC4aC248Fa3a60f639",
        "0x294e715C1a2Ce676Ca31cE91a0358935Ca290F55",
        "0x8ce0Fa2728d06A0238BD3503C2502D2B420785Cd",
        "0xf647fa6cFD479daf011aAdA82F361e5d29288fb2",
        "0xE5a8dE80A754dB666725b4aE84B721aC27835b92",
        "0xfceFe744556b445F33eA05050C8C494EA7cF2cc7",
        "0x9596611D145c618d5DE85279799889fFfbA3d22b",
        "0x85520c4442aFBda9DC514ab0033C56CdC838b990",
        "0x9596611D145c618d5DE85279799889fFfbA3d22b",
        "0x9b4031ff0f233c296cb47e6803be2812bf3cdd51",
        "0xAb37904313c2EDa08a1b03e126FF75b8b2D45a22",
        "0x6b2dADf191c88537Ab969443D309b90183DDeb18",
        "0xDfE221f01aCAf5C0c04deEC3cdF1895F1A915136",
        "0xF43434a171b73cE93569F9F804C20f470aCbc83C",
        "0x99E03c4fEEe1dE5265CCC36965D0aEc275Ea2e19",
        "0xcB840b232A334De6347e9d5CF4d157F56D57b01b",
        "0x8bdC04119AAbbafc29ACf2cEaBe0d6C1A0f4a2f5",
        "0xdF3986099fc4aEdac9ABeE68971daa9Fb08165dd",
        "0xF9755f34BCD370b6ba5783942d55B2f02C5649F2",
        "0xA618301F2C7fe8868681C9440CB1C69963D15C52",
        "0xF939A6D28b46B4235e8782251e495a4c7Ce60997",
        "0x4dc963b766EEDeE0bAdCB1efB120B3E53b6610c7",
        "0xB2c6578CA04f7243Ee165c631905fbAd716D5603",
        "0xab7Fca90705e94BeaAea04Bfe8106Dcf268E0cC2",
        "0x338566F5c19BB0Fb1FF56CcB512d3A55487556d1",
        "0x219e2237FE500DADB8ce87d86Afc20789894FF43",
        "0x4b53166ca0a86C8C63350155403De1fc2D004A47",
        "0xedf9056B7F2dBA4Ef748B807Ac798C41e46584e1",
        "0xcf89E80faC565cA16024a0B5B4E845cc9dAbDBCe",
        "0xDD5d43155dA88515f091b475df62c6436B43f279",
        "0xd77D10761771E562ac7F1981407b50A7f451C4A3",
        "0xc903B018b5A704467a2E6F5b51936E463755b6B6",
        "0x3e02C59c2827aAa5ea0682F291022FA81d48D56E",
        "0x1546531506F8784Fe6b7f5DFa6936dAAe4c67e1F",
        "0x5a1b557ab3eeca8a1b8a36949877c23849d50f5f",
        "0xBccD2939b0389A2e76A133241d84e2F808853D2F",
        "0x2086eBe3BE95a6d9968C3E0f2988594C8a2a1436",
        "0x4b08d40514b49cd96B9304458C2e8B73c9F6E3ae",
        "0xad37bF1CE340F78f3E2F4BA5CDd61f51976e9D35",
        "0xb0629427707f3878fE087B7177D58F5448854725",
        "0xE4b744d62D990585FA4a749e389681272977C4BB",
        "0x254bC1Edcce11189147C30E3013e3F42974c13FB",
        "0x76Bb8e4DdaACddaf75634f22C2AaE412d2621BE3",
        "0xA1A8E03671d55675e72D9c492B644e76BeeA12da",
        "0xeA19a56Dc5813328b367C0cacD78fEaBA46A9FD3",
        "0xDAdd262742A535Dfa9Ed251f976e158101E522B0",
        "0x02d3f7d7E4e6C25D4E12d25Bc09D418049eEB9F7",
        "0x73D96AEB8ed9F124F3EBD57faF3e25AFb4D152d0",
        "0x2AE75d60a830244fb8f21369e7D2Eac061B2dd47",
        "0x6aa13e23A4f1b265EAc24Ca3d6DcC5707E7185e0",
        "0x061693D44479344D56AEf8C2Ef23a6B6Cd5bE3d8",
        "0xc616Ea9E0dC7E23480A6B1bC44409f38DacD26Cd",
        "0x5Dbb45c34F7f8f800a6aF9BA62A89f43B69A9909",
        "0x594D3831698de6F1b946163ED4876E990E31d421",
        "0x1b60f83f90B9Ea569A641DeEF9AbCad9B2178E19",
        "0xe7277D315101412560D5432e7d74422e81702938",
        "0x9A3aFA1EE3eeDB16873Fb0007b6913d148DA6671",
        "0xECC4c48e903B367a3AB33BD348249bbE59320b04",
        "0xEe1bEF37Bee5d3A24c7757C0a39A7fa2e62240F6",
        "0x2E45a67d67520F45a79962B0a084B540b3486302",
        "0x4215fd16aed1C594DF6a5ec3F6bb791C3E0Be7B8",
        "0x3A556e66c075e8e3560B08183E0B56F758DCa556",
        "0x19b5513F5e746FbEA16258c4c4f6b751161aa25F",
        "0x3c8daE2726682135c9bc382486668Dd0420f0469",
        "0x8071aBD68223A781D76a03Ddd02e64e5D105b116",
        "0x4Bc363Dc6b752B45E9b5F1bfef60E4B9689f6cBA"
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