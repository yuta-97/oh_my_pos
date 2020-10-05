<template>
    <div class = "list-item" >
        <div class = "item id"> {{ goods.goodsname }} </div>
        <div class = "item contents">
            <div class = "item title"> {{ goods.type }}</div>
            <div class = "item body"> {{ goods.desc }} </div>
            <div class = "item userId"> {{ goods.price }} </div>
        </div>

    </div>
</template>

<script>
export default {
    name : 'ManGoodsItem',
    props : {
        goods : {
            type :Object,
            required : false,
            default : void 0
        }
    }
}
</script>

<style scoped>
    .list-item {
        padding : 1rem 0;
        font-size: 2rem;
        display: flex;
        border-bottom : 1px solid #D8D8D8;
    }

    .item {
        width: 100%;
    }

    .userId{
        flex:1;
    }

    .id {
        flex :1;
    }

    .contents {
        flex :7;
    }

    .title {
        font-weight: bold;
    }

    .body {
        font-size : 1.5rem;
    }

</style>