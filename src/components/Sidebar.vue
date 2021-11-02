<template>
    <div class="sidebar">
        <div class="row logo">
            <img src="../assets/logo.png" alt="" class="thumbnail">
        </div>
        <div class="row menu_itms">
            <ul>
                <li><router-link class="a_tag" to="/"><i class="fas fa-home"></i>Home</router-link></li>
                <li><router-link class="a_tag" to="/searchpincode"><i class="fa fa-location-arrow"></i>Serach Pincode</router-link></li>
                <li><router-link class="a_tag" to="/Contarct_reneval_portal"><i class="fas fa-th-large"></i>Contarct Reneval</router-link></li>    
                <li><router-link class="a_tag" to="/"><i class="fas fa-cog"></i>Settings</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
}
</script>

<style scoped>
    .logo{
        margin: 1rem;
    }
    .sidebar{
        height: 100vh;
        width: auto;
        display: flex;
        position: relative;
        flex-direction: column;
    }
    .sidebar .menu_itms{
        height: 100vh;
        padding: 30px 0;
        box-sizing: border-box;

    }
    .sidebar .menu_itms ul li{
        padding: 15px;
        border-bottom: 1px solid rgba(0,0,0,0.05);
        border-bottom: 1px solid rgba(225,225,225,0.05);
        list-style: none;
        line-height: 30px;
        background-color: transparent;
        
    }
    .sidebar .menu_itms ul li .a_tag{
        color: #bdb8d7;
        display: block;  
        font-size: 18px;
        text-decoration: none;
    }
    .sidebar .menu_itms ul li i{
        padding-right: 10px;
        color: #0476f8;
    }
</style>