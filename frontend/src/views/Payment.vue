<template>
    <div class="main-container">
        <div class="orderList">
            <OrderList :order="orderlist"></OrderList>
            <hr/>
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
        display: block;
        width: 1024px;
        /* width: 100%; */
        height: 720px;
        /* height: 100%; */
    }

    .orderList{
        float: left;
        width: 50% !important;
        /* min-height: 300px; */
        height: 40% !important;
        /* max-height: 320px; */
        font-size: 14px !important;
        background-color: #f3f4f7;
    }

    .orderCalc{
        clear: left;
        float: left;
        width: 50%;
        height: 60%;
        background-color: #f3f4f7;
    }

    .goodsNpay{
        float: right;
        width: 50%;
        height: 100% !important;
        background-color: #f3f4f7;
    }


</style>