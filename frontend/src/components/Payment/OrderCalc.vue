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
                        {{tot_price}}
                        </td>
                    </tr>
                    <tr height="40">
                        <th bgcolor="gray" width="225">받 을 금 액</th>
                        <td width="200" align="center">
                        {{tot_price}}
                        </td>
                    </tr>
                </thead>
            </table>
        </div>

        <div style="float: right; width: 50%;">
            <div class="display">
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
                <b-button squared @click="del()"></b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            current: ''
        }
    },

    methods: { 
        addOutput(num) {
            this.current = `${this.current}${num}`;
        },

        reset() {
            this.current = '';
        },

        del() {
            this.current.value = this.current.value.substring(0, this.current.value.length - 1);
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
        width: 100px;
        height: 80px;
        font-size: 20px;
        padding: 10px;
    }
</style>