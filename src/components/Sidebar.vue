<template>
    <div class="sidebar">
        <!-- <div class="row logo">
            <img src="../assets/logo.png" alt="" class="thumbnail">
        </div> -->
        <div class="row menu_itms">
            <ul>
                <li><router-link class="a_tag" to="/"><i class="fas fa-home"></i>Home</router-link></li>
                <li><router-link class="a_tag" to="/searchpincode"><i class="fa fa-location-arrow"></i>Search Pincode</router-link></li>
                <li><router-link class="a_tag" to="/Contarct_reneval_portal"><i class="fas fa-th-large"></i>Contract Renewal</router-link></li>    
                <li><router-link class="a_tag" to="/"><i class="fas fa-cog"></i>Setting</router-link></li>
                <li><router-link class="a_tag" to="/crop_data"><i class="fas fa-angle-double-right"></i>Crop Data</router-link></li>
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
        box-sizing: border-box;
        margin-top: 2rem;
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