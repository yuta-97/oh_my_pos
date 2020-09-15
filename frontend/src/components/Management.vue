<template>
    <nav>
      <ul>
        <li> <a href="/Menu1"> 메뉴1 </a> </li>
        <li> <a href="/Menu2"> 메뉴2 </a> </li>
        <li> <a href="/Menu3"> 메뉴3 </a> </li>
        <li> <a href="/Menu4"> 메뉴4 </a> </li>
        <li> <a href="/Menu5"> 메뉴5 </a> </li>
      </ul>
    </nav>


</template>

<script>
export default {
  name: 'management',
  methods: {

    }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
    background-color: #ccc;
    width: 20%;
    padding: 0;
    margin:  0;
    position: fixed;
    height: 100%;
    overflow: auto;
    left: 80%

  }

  li a {
  text-decoration: none;
  display: block;
  color: #000;
  padding: 8px 15px 8px 15px;
  font-weight: bold;
  border:10px solid #000000;
}

li a:hover {
  background-color: blue;
  color: #fff;
}


</style>
