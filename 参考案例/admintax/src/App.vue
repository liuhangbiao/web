<template>
  <div id="app" class="layout">
  	<Layout>
        <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
            <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        <span>内容管理</span>
                    </template>
                    <MenuItem name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span>内容管理</span>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <Icon type="search"></Icon>
                        <span>用户管理</span>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <Icon type="settings"></Icon>
                        <span>权限管理</span>
                    </MenuItem>
                </Submenu>
               <!--  <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-people"></Icon>
                        用户管理
                    </template>
                    <MenuItem name="2-1">新增用户</MenuItem>
                    <MenuItem name="2-2">活跃用户</MenuItem>
                </Submenu> -->
            </Menu>
            <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                <MenuItem name="1-1">
                    <Icon type="ios-navigate"></Icon>
                    <span>内容管理</span>
                </MenuItem>
                <MenuItem name="1-2">
                    <Icon type="search"></Icon>
                    <span>用户管理</span>
                </MenuItem>
                <MenuItem name="1-3">
                    <Icon type="settings"></Icon>
                    <span>权限管理</span>
                </MenuItem>
            </Menu>
        </Sider>
        <Layout>
             	<Header :style="{padding: 0}" class="layout-header-bar">
                    <!-- <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon> -->
                    <!-- <Icon @click.native="collapsedSider"  :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon> -->
                    <Row>
                        <i-col span="6" push="18">
                                 <Button type="info">Info</Button>
                                <Button type="success">Success</Button>
                                <Button type="warning">Warning</Button>
                                <Button type="error">Error</Button>
                        </i-col>
                    </Row>
                </Header>
                 <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Card>
                        <div style="height: 600px">
                             <router-view/>
                        </div>
                    </Card>
                </Content>
                <!-- <Footer>Footer</Footer> -->
        </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'App',
    data () {
        return {
            isCollapsed: false
        }
    },
    computed: {
        rotateIcon () {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    },
    methods: {
        collapsedSider () {
            this.$refs.side1.toggleCollapse();
            console.log(this.$refs.side1)
        }
    }
}
</script>

<!-- <style lang="less" src="less/base.less"> -->
<style lang="less">
@import '~less/base.less';
@import '~less/iviews.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
}
.layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}
.menu-icon{
    transition: all .3s;
}
.rotate-icon{
    transform: rotate(-90deg);
}
.menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
}
.menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
}
.collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
}
</style>
