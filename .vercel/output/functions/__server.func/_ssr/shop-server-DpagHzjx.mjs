import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { f as authMiddleware } from "./hours-DVH-z3bz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-server-DpagHzjx.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getStorefront = createServerFn({ method: "GET" }).handler(createSsrRpc("3e9f6705a03f55c7367d51be98f4352bb380ffbd59c2a91c620ed5e0995217e1"));
var getShopContact = createServerFn({ method: "GET" }).handler(createSsrRpc("8a089eb873cc534ed1bd9d17853df74ce61d84735d84efd9f380782afb170b65"));
var getMe = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("b8e22a13b662d091aee128cd6d1ebc8b222a99837996e65e40a07853632f42c3"));
var getMyRewards = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("35f265b0dc254ad56abb2de18bea5d0b7f85cf232e6710c8bdc4a44122c887c4"));
var claimReferral = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("f682853d56d112a3f4a0dcca864fb97e72e162535352f0d152f01bac1db1493e"));
var updateProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("5950193f3d753f32698018454d73b58d7fdc8b5ea2aa14a42de169d1268239ea"));
var claimAdmin = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("dbe07ebe34ad90c5a9260ce8b92ff36457d481dceb7063bc94b3db86cc5fd6a4"));
var getTwoFactorStatus = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("6c424cbe95654144167219167617293487fb8d1b08f131793d847208e1ba4cd6"));
var startTotpSetup = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("f90ffd0cb3e44665a49d9e85dd34112ffbee3d9fafa02dc50fed6603db2cdb0c"));
var confirmTotpSetup = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("1e2be28c84d39a2f8dd714eaf2c0915488e3a026a32d331c7dc9671881f8f8cc"));
var verifyTotpChallenge = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("332fb1ebcf6f9af1fe043b2d72d5535b336dd8ec06d505e994fe5c368090210f"));
var disableTotp = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("83d49b93260f6d39298a38704a43e533c52e8173f971d1b7658e100942ed1f59"));
var checkDeliveryAddress = createServerFn({ method: "POST" }).validator((data) => ({ query: data.query.trim() })).handler(createSsrRpc("514af9501a1d9ca90991f58e55092ab224f1a784b82ab9bf84e9978ed6eb8b0b"));
var placeOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("a86830613005e0efa96728ff8ce8959214bbe7d3fe2f213278a25da1d6b01a4d"));
var placeGuestOrder = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("0a2f400b8bd127862368fe1e673b21e04771f605263fc254089fcf0c082033d3"));
var listMyOrders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("e138e878a2579f8d295b471784401f1aaddc311e5cca601678c47aea1161e908"));
var saveShopMenu = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("5169a9e63544badbc4dfd2bf82336507444ce69e7c5a75ce33a3ab5c2ceae0b2"));
var saveShopSettings = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("4c4c9ed72514c36fc6383ad66d96d7b898f5e43d0eb9e10be6c5bb4722c016ce"));
createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("1a3c9b7a89fdd1bee2670d8deed7aac98907c192c3730703155316bc929700d4"));
var getAdminShop = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("971dc20631d85431ea74c37c1f767a8debc4b72023eec6f55358703f7ae1901a"));
var saveDeliveryZone = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("d6bfaa233bebc5dd2452671a1e44780d44ad5df8ef6cbe19c7c3fae308917ef2"));
var listAllOrders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("9e06269a2e64058352abf36b0cfc7655a8a6306a8839b04afdc0d165b71c6f36"));
var updateOrderStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("6248d7260d5009f275421e55ec9465053af4597f8bfe14bd0b06b9c6e93a19da"));
var acceptOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("6b016f733836672a6d31ce4eb9274ae2116885fa4902e070f749996a870ae0b4"));
var getAdminInsights = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("f1ac3b56f9066fa0f3a79304184a4317fb3e4b8b00a6839d09769c0a779f7553"));
var listCustomers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("0a897cfe0a29d64ab7d202af39e50380a4a9d5895aca09fde579debd015c7f8e"));
var setAccountRole = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("38dde3267a1a764c7f466ef4bea18a9385d78f473400b8f205c3c2cbf696fa86"));
var setAccountBanned = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("ea5a208e042a5ef3f7b152ae95c22c2f0ba0342f20a2389ade5195516af08ced"));
var adjustCustomerPoints = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("6837d55db11b3d67c287bb4576e198cdc6886c03c4f3aefb6761743ce705e4d4"));
var deleteOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("8009c13d49254d840f003eccd64c51d61b988f9d6ecb3bcc3260f2ee3168ecce"));
var recoverPassword = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("9f27df72f953f9d4e92d96f699ffbaf92e96cf24b310983028f31c929e30807e"));
var sendPasswordResetCode = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("6bf02f45892370365b2c8cbb04e561fec611dfd9655a8195ef4aa88a69100c51"));
var changeMyPassword = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("b3d77c9a4c735ff404dcbea870571db354d68ce4b34aaf3e32d03711ed9e38eb"));
var patchPosOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("353c71c7e2029e27b2fbe3d0fab0134262150feb44f5d5ebb2c43cf4b0b3d072"));
var listPosOrders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("1206b02a97ef848d3762666fb57bfcf3704c1543c098864a19989d5800595d00"));
var listIncomingOrders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("d854d44aa3f204c2b7c3d5f67d750a3fa01982988a33161dbb9d24c6bdaadd0d"));
var getAdminInboxCount = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("05fde0cd6acff5dcf2d72eba71c33f0f2ec07f553282d9820053733d946d9b44"));
var listAdminChats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("9eb173db2134b93997d461c05fceda01690b6da2b7537a41e4ea5438d70d85a2"));
var listMyChats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("2545826bb2beb54af1f3131df2c911dfbab5b12a6d5560a433aa7eb2faae5fcc"));
var loadChatMessages = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("6396d6554feb23219f0d0edc1c2d3f445b5608846b9c2441cb1647075fdefb7c"));
var startChat = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("16cacd9a1e5e9fd5af48ae2106a6dde505a2f79a0236ac7916ad104aa8f286c5"));
var sendChatMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("e9ae1e079d8cdff7ebb28cfebfa94d061b7fc89a70b7cd3ad83b31134e9474e0"));
var setChatResolution = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("d2aa6a345d9a7d270555a60411f1eecd71fd2f6fbaebbb2b8a7247869dd7ccc8"));
var attachChatOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("b45f21af2f82f67c84429e9c82fcb3b8465d1c2fd2be129b05264fb9a42a1bed"));
var startAdminChat = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("8ed47f0f95f0fd928a3867a8c22d06ca683a53003e27db38d73944bbc9a39dce"));
var setChatStaffNote = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("ee424e5f66bbce729edb2eeb2a8b55c2a072faf7605f611f83417dc6916ce827"));
var setChatMuted = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("40e86a191d140c403d5961677d7ca214977a0646825cd13ec616f2075c5411cd"));
var setChatFlagged = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("45969789c4e158c61e0b50e40516caafc9fc5b0653bc57eaee07e4f33a422d2a"));
var deleteChatMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("059d860554c5b698041079549470ec22b4209e73acdca3cb55c29f957c243f2d"));
var deleteChatThread = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("dee3ffe6ae118327bb704934e7000b191fe224fd07848feda62eef2560bdcbdb"));
//#endregion
export { placeGuestOrder as A, setChatFlagged as B, listCustomers as C, listPosOrders as D, listMyOrders as E, saveShopSettings as F, startChat as G, setChatResolution as H, sendChatMessage as I, updateProfile as J, startTotpSetup as K, sendPasswordResetCode as L, recoverPassword as M, saveDeliveryZone as N, loadChatMessages as O, saveShopMenu as P, setAccountBanned as R, listAllOrders as S, listMyChats as T, setChatStaffNote as U, setChatMuted as V, startAdminChat as W, verifyTotpChallenge as Y, getMyRewards as _, checkDeliveryAddress as a, getTwoFactorStatus as b, confirmTotpSetup as c, deleteOrder as d, disableTotp as f, getMe as g, getAdminShop as h, changeMyPassword as i, placeOrder as j, patchPosOrder as k, deleteChatMessage as l, getAdminInsights as m, adjustCustomerPoints as n, claimAdmin as o, getAdminInboxCount as p, updateOrderStatus as q, attachChatOrder as r, claimReferral as s, acceptOrder as t, deleteChatThread as u, getShopContact as v, listIncomingOrders as w, listAdminChats as x, getStorefront as y, setAccountRole as z };
