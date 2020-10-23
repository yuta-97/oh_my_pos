<template>
    <div class="main-container">
        <div class="orderList">
            <OrderList :order="orderlist"></OrderList>
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
    },
    data() {
        return{
            //
        }
    },
    computed: {
        table_num(){
            return this.$route.params.num;
        },
        storename() {
            return this.$store.state.store_name;
        },
        orderlist(){
            return this.$store.state.order;
        },
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
        /* position: fixed; */
    }

    .orderCalc{
        clear: left;
        float: left;
        width: 50%;
        height: 50%;
        /* position: fixed; */
    }

    .goodsNpay{
        float: right;
        width: 50%;
        height: 100%;
    }


</style>