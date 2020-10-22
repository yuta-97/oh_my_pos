<template>
    <div class="main-container">
        <div class="orderList">
            <OrderList></OrderList>
        </div>

        <div class="goodsNpay">
            <GoodsNPay></GoodsNPay>
        </div>

        <div class="orderCalc">
            <OrderCalc></OrderCalc>
        </div>

    </div>
</template>

<script>
import OrderList from "../components/Payment/OrderList.vue"
import OrderCalc from "../components/Payment/OrderCalc.vue"
import GoodsNPay from "../components/Payment/GoodsNPay.vue"

export default {
    components: {
        OrderList,
        OrderCalc,
        GoodsNPay
    }
}
</script>

<style scoped>
    .main-container{
        width: 100%;
        height: 100%;
    }

    .orderList{
        float: left;
        width: 50%;
        height: 50%;
    }

    .orderCalc{
        clear: left;
        float: left;
        width: 50%;
        height: 50%;
    }

    .goodsNpay{
        float: right;
        width: 50%;
        height: 100%;
    }


</style>