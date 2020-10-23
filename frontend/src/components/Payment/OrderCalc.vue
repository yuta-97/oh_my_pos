<template>
    <div>
        <div style="float: left; width: 50%;">
            <table class="table table-bordered">
                <thead>
                    <tr height="40">
                        <th bgcolor="gray" width="225">총 합 계</th>
                        <td width="200" align="center">
                        {{tot_price}}
                        </td>
                    </tr>
                    <tr height="40">
                        <th bgcolor="gray" width="225">할 인 액</th>
                        <td width="200" align="center">
                            {{dis_amount}}
                        </td>
                    </tr>
                    <tr height="40">
                        <th bgcolor="gray" width="225">받 을 금 액</th>
                        <td width="200" align="center">
                        {{pay_price}}
                        </td>
                    </tr>
                </thead>
            </table>
        </div>

        <div style="float: right; width: 50%;">
            <div class="display">
                <input class="form-control" type="text" readonly :value="input_link"> 
                <input class="form-control" type="text" readonly :value="current || '0'"> 
            </div>
            <div class="button">
                <b-button squared @click="addOutput('1')">1</b-button>
                <b-button squared @click="addOutput('2')">2</b-button>
                <b-button squared @click="addOutput('3')">3</b-button>
            </div>
            <div class="button">
                <b-button squared @click="addOutput('4')">4</b-button>
                <b-button squared @click="addOutput('5')">5</b-button>
                <b-button squared @click="addOutput('6')">6</b-button>
            </div>
            <div class="button">
                <b-button squared @click="addOutput('7')">7</b-button>
                <b-button squared @click="addOutput('8')">8</b-button>
                <b-button squared @click="addOutput('9')">9</b-button>
            </div>
            <div class="button">
                <b-button squared @click="reset()">C</b-button>
                <b-button squared @click="addOutput(0)">0</b-button>
                <b-button type="button" squared @click="del()">
                    <b-icon icon="arrow-left"></b-icon>
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
import EventBus from './EventBus';

export default {
    data: function () {
        return {
            current: '',
            tot_price: 0,
            dis_amount: 0,
            dis_rate:0,
            input_link: '할인액 적용',
            at: 'dis_amount',
            focus: 1, // 1 = 할인액, 2 = 할인율
        }
    },
    computed:{
        pay_price() {
            return this.tot_price - this.dis_amount;
        }
    },
    watch:{
        //
    },
    mounted: function(){
        EventBus.$on('tot-change', (data)=>{
            this.tot_price = data;
        });
        EventBus.$on('focus-payment', (data)=>{
            this.input_link = '할인율 적용';
            this.focus = 'payment';
            console.log(data);
            //
        })
    },

    methods: { 
        addOutput(num) {
            this.current = `${this.current}${num}`;
            if( this.focus == 1){
                if( parseInt(this.current) < this.tot_price){
                    this.dis_amount = parseInt(this.current);
                }else{
                    this.dis_amount=0;
                    this.current='';
                    alert("할인액은 총 금액을 넘을 수 없습니다!!");
                    
                }
                
            }else if( this.focus == 2){
                if( parseInt(this.current) < this.tot_price){
                    this.dis_amount = parseInt(this.current);
                }else{
                    this.dis_amount=0;
                    this.current='';
                    alert("할인액은 총 금액을 넘을 수 없습니다!!");
                }
            }
            
        },

        reset() {
            this.current = '';
        },

        del() {
            this.current = this.current.substring(0, this.current.length - 1);
        }

    }
}
</script>

<style scoped>
    #display {
        width: 100px;
        height: 80px;
        font-size: 60px;
        font-weight: bold;
        text-align: right;
        padding-right: 8px;
    }
    
    .button {
        display: flex;
        flex-direction: row;
    }
    
    .button button {
        width: 50%;
        height: 80px;
        font-size: 20px;
        padding: 10px;
    }
</style>