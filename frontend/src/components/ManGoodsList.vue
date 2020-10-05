<template>
    <div class = "list">

        <div class = "list-title">
                <div class = "title no"> 상품명 </div>
                <div class = "title contents"> 카테고리 </div>
                <div class = "title id"> 가격 </div>
                <div class = "title id"> 설명 </div>
        </div>
        
        <ManGoodsItem v-for="goods in pageItem" :item = "goods" :key="goods.no"> </ManGoodsItem>
        
        <div class = "btn">
            <button class = "page-btn" v-bind:disabled="pageNum === 0" v-on:click="prevPage"> 이전 </button>
            <span class = "page-count"> {{ pageNum +1}} / {{ pageCount}} </span>            
            <button class = "page-btn" v-bind:disabled="pageNum >= pageCount -1" v-on:click="nextPage" > 이후 </button>
        </div>

    </div>
</template>

<script>
import ManGoodsItem from '../components/ManGoodsItem.vue'

export default {
    name : 'ManGoodsList',
    components : {
        ManGoodsItem
    },

    data () {
        return {
            pageNum : 0,
            pageSize : 5
        }
    },

    props : {
        initArray : {
            type : Object,
            required : true
        }
    },

        computed: {
        pageCount() {
            let listLeng = this.initArray.length
            let listSize = this.pageSize
            let page = Math.floor(listLeng / listSize)

            if(listLeng % listSize > 0) page += 1

            return page
        },
        pageItem() {
            const start = this.pageNum * this.pageSize
            const end = start + this.pageSize

            return this.listArray.slice(start,end)
        }
    },

    methods: {
        nextPage () {
            this.pageNum += 1;
        },
        prevPage () {
            this.pageNum -= 1;
        }
    }
}

</script>

<style scoped>
    .list {
        width: 100%;
        border-collapse: collapse;
    }

    .list-title {
        font-size: 2rem;
        display : flex;
        border-bottom : 2px solid #454545;
    }
    .title {
        border-top : 2px solid #404040;
        width: 100%;
    }

    .id {
        flex :1;
    }

    .no {
        flex : 1
    }

    .contents{
        flex : 7
    }

    .btn-cover {
      margin-top: 1.5rem;
      text-align: center;
    }
    .btn-cover .page-btn {
      width: 5rem;
      height: 2rem;
      letter-spacing: 0.5px;
    }
    .btn-cover .page-count {
      padding: 0 1rem;
    }

</style>