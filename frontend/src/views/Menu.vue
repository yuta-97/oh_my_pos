<template>
    <div class="all">
        <div class = "storeName"> 
            <b> 상호명 </b>
        </div>

        <div class = "main-content">
             <b-card no-body>
                <b-nav pills card-header slot="header" v-b-scrollspy:nav-scroller>
                    <b-nav-item href="#cate1" @click="scrollIntoView">카테1</b-nav-item>
                    <b-nav-item href="#cate2" @click="scrollIntoView">카테2</b-nav-item>
                    <b-nav-item href="#cate3" @click="scrollIntoView">카테3</b-nav-item>
                </b-nav>

                <b-card-body
                    id="nav-scroller"
                    ref="content"
                    style="position:relative; height:600px; overflow-y:scroll;"
                    @click="openModal"
                >
                    <h4 id="cate1">카테1</h4>
                        <b-card img-src="https://placekitten.com/100/100" img-alt="Card image" img-right>
                            <b-card-text>
                                <b>상품명</b><br>
                                설명<br>
                                가격<br>
                            </b-card-text>
                        </b-card>
                         <b-card img-src="https://placekitten.com/100/100" img-alt="Card image" img-right>
                            <b-card-text>
                                <b>상품명</b><br>
                                설명<br>
                                가격<br>
                            </b-card-text>
                        </b-card>
                        <b-card img-src="https://placekitten.com/100/100" img-alt="Card image" img-right>
                            <b-card-text>
                                <b>상품명</b><br>
                                설명<br>
                                가격<br>
                            </b-card-text>
                        </b-card>
                    <h4 id="cate2">카테2</h4>
                        <b-card img-src="https://placekitten.com/100/100" img-alt="Card image" img-right>
                            <b-card-text>
                                <b>상품명</b><br>
                                설명<br>
                                가격<br>
                            </b-card-text>
                        </b-card>
                         <b-card img-src="https://placekitten.com/100/100" img-alt="Card image" img-right>
                            <b-card-text>
                                <b>상품명</b><br>
                                설명<br>
                                가격<br>
                            </b-card-text>
                        </b-card>
                        <b-card img-src="https://placekitten.com/100/100" img-alt="Card image" img-right>
                            <b-card-text>
                                <b>상품명</b><br>
                                설명<br>
                                가격<br>
                            </b-card-text>
                        </b-card>
                    <h4 id="cate3">카테3</h4>
                        <b-card img-src="https://placekitten.com/100/100" img-alt="Card image" img-right>
                            <b-card-text>
                                <b>상품명</b><br>
                                설명<br>
                                가격<br>
                            </b-card-text>
                        </b-card>
                         <b-card img-src="https://placekitten.com/100/100" img-alt="Card image" img-right>
                            <b-card-text>
                                <b>상품명</b><br>
                                설명<br>
                                가격<br>
                            </b-card-text>
                        </b-card>
                        <b-card img-src="https://placekitten.com/100/100" img-alt="Card image" img-right>
                            <b-card-text>
                                <b>상품명</b><br>
                                설명<br>
                                가격<br>
                            </b-card-text>
                        </b-card>

                </b-card-body>
                </b-card>
        </div>

        <div class="cart">
            <b-button> 카트 </b-button>
        </div>

        <div class = "selectMenu">
            <MyModal @close="closeModal" v-if="modal">
                <div class = "menu">
                    <b-card
                        title="Card Title"
                        img-src="https://picsum.photos/600/300/?image=25"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2"
                        >

                        <b-card-text>
                                Some quick example text to build on the card title and 
                                make up the bulk of the card's content.
                        </b-card-text>
                        
                        <b-card-text>
                                price
                        </b-card-text>
                    </b-card>
                </div>

            <hr/>
<!-- 리스트 처럼 할꺼 -->
                <div class = "option">

                     <b-form-group label="옵 션">
                        <b-form-checkbox-group
                            id="checkbox-group-1"
                            :options="options"
                            name="flavour-1"
                        ></b-form-checkbox-group>
                    </b-form-group>
                </div>
                    
             <hr/>

                <div class ="footer">
                    수 량
                    <b-button v-on:click=" counter -= 1 ">&lsaquo;</b-button>
                        {{ counter }} 개
                    <b-button v-on:click="counter += 1">&rsaquo;</b-button>
                </div>

            </MyModal>
        </div>
    </div>
</template>

<script>
import MyModal from "../components/Menu/MenuAdd.vue";

export default {
    components: {
        MyModal
    },

    data() {
        return {
            modal: false,
             options : [
                { text: 'Item 1', value: 'first' },
                { text: 'Item 2', value: 'second' },

            ],
            counter: 0,
        }
    },

    watch: {
        counter: function() {
            if(this.counter<0) {
                this.counter=0;
            }
        }
    },
    

    methods: {
        openModal() {
            this.modal = true
        },

        closeModal() {
            this.modal = false
        },

       scrollIntoView(evt) {
        evt.preventDefault()
        const href = evt.target.getAttribute('href')
        const el = href ? document.querySelector(href) : null
        if (el) {
          this.$refs.content.scrollTop = el.offsetTop
        }
      }
    },

}
</script>

<style scoped>
    .storeName {
        float:left; 
        width:100%; 
        height:50px;
    }

    .main-content {
        clear:left; 
        float:left; 
        width: 100%;
        position:fixed;
        height:1000px; 
        overflow-y:scroll;
    }

    .cart {
        position:absolute; 
        clear:left; 
        float:left; 
        width:100%;
        height:50px; 
        left:0; 
        bottom:0px;
    
    }

    .selectMenu {
        display: table-cell;
        vertical-align: middle;
    }

    .menu {
        clear:left;
        float:left; 
        width:300px;
    }

    .option{
        float:left; 
        width:300px; 
        height:50px;
    }

    .footer {
        position:absolute; 
        clear:center; 
        width:300px; 
        height:50px; 
        left:0; 
        bottom:0px;
    }

    /* .hr{
        margin-top: 1rem;
        margin-bottom: 1rem;
        border: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    } */
</style>