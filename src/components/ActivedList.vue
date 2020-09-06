<template>
  <div id="actived">
      <div class="grid">
        <div class='grid_body' v-for='good in lists' :key='good' >
          <div>{{good[0].lname}}<span :id='good[2].id' >▼</span></div>
          <ul :id='good[2].id+"_t"'>
            <li v-for="content in good[1].lcontent" :key="content" >
             {{content}}
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import goods from '../assets/data/list.json'

export default {
  name: 'activedlist',
  data () {
    return {
      lists: goods,
      $grid: ''
    }
  },
  methods: {
  },
  created () {
    $(document).ready(function () {
      var $grid = $('.grid').isotope({itemSelector: '.grid_body'})

      $('.grid_body span').on('click', function () {
        var target = '#' + this.id + '_t'
        $(target).toggle(0, function () {
          $grid.isotope('layout')
        })
      })
    })
  }
}
</script>

<style>
#actived {padding:0 35px;}
#actived .grid_body {width:200px; float: left; margin:15px; padding:0;}
#actived .grid_body div {background: #ff6a83; padding:7px 10px; color:#ffffff; text-align: left; position:relative;}
#actived .grid_body span {position: absolute; right:15px; cursor: pointer}
#actived .grid_body ul {width:200px; padding:0; border-bottom:0; border-spacing:0; display:none}
#actived .grid_body ul li {background: #ffffff; padding:6px 8px; border:1px solid #707070; border-top:0}
</style>
