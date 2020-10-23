<template>
    <div class="container">
            <div class="top">
                <div style="float: right; text-align: right;">
                    <b-icon icon="x-circle" scale="2" variant="danger"></b-icon>
                </div>
            </div>

            <div class="body">
                <div class="cash-img">
                    <b-img 
                        width= "200px"
                        hegih= "200px"
                        src="https://raw.githubusercontent.com/Cozy-Ho/oh_my_pos/master/frontend/src/assets/cash.png">
                    </b-img><br/><br/>
                </div>
                <div class="cash">
                    <table class="table table-bordered">
                        <thead>
                            <tr height="40">
                                <th bgcolor="gray" width="225">받을금액</th>
                                <td width="200" align="center">
                                <!-- {{tot_price}} -->
                                </td>
                            </tr>
                            <tr height="40">
                                <th bgcolor="gray" width="225">받은금액</th>
                                <td width="200" align="center">
                                    <!-- {{dis_amount}} -->
                                </td>
                            </tr>
                            <tr height="40">
                                <th bgcolor="gray" width="225">거스름돈</th>
                                <td width="200" align="center">
                                <!-- {{pay_price}} -->
                                </td>
                            </tr>
                        </thead>
                    </table> <br/><br/>
                </div>

                <div class="cash-receipt">
                    <p style="text-align: left; text-wegiht: bold;"> 현금영수증 처리 </p>
                    <hr/>
                    <table class="table table-bordered">
                            <thead>
                                <tr height="40">
                                    <th bgcolor="gray" width="225">확인번호</th>
                                    <td width="200" align="center">
                                    <!-- {{tot_price}} -->
                                    </td>
                                </tr>
                                <tr height="40">
                                    <th bgcolor="gray" width="225">사용구분</th>
                                    <td style="width= 200; align=center; display: flex;" >
                                        <div style="flex: 1; text-align: left;">
                                            <b-radio v-model="radio" name="name">개인</b-radio>
                                        </div>
                                        <div style="flex: 1; text-align: left;">
                                            <b-radio v-model="radio" name="name">사업자</b-radio>
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                        </table>   <br/>
                </div>

                <div class="pay">
                    <b-button>결 제</b-button>
                </div>
            </div> 
    </div>
</template>

<script>
export default {
    data() {
      return {
        
      }
    },
    methods: {
      
    }
}
</script>

<style scoped>
    .container {
        display: block;
    }

    .top {
        margin-top: 10px;
        height: 10%;
    }

    .body {
        padding-top: 50px;
        padding-left: 20px;
        padding-right: 20px;
        display: block;
        height: 90%;
    }

    /* .cash-recipt{
        padding: 50px;
    } */

    .pay {
        text-align: right;
    }

</style>