<template>
  <div class="alipay">
   <form id="alipaysubmit" name="alipaysubmit" action="https://mapi.alipay.com/gateway.do?_input_charset=utf-8" method="POST"><input type="hidden" name="_input_charset" value="utf-8"/><input type="hidden" name="subject" value="艺术圈交易平台商户支付"/><input type="hidden" name="sign" value="uZK5eCceY5MCdoLHfUTTfmRHK1b+1c4nVtjXMPgLQrEM+WLENZA0x2e4eOmsnDO+Dz0pCP7AxFJpc+7v9+Dojw0B+WlMxUtVcjuqsuSady0EFIrp39wEs5VZQZ0zJ5ZqZU83lCPKb90BMxt2SHwqAQUrsviIkxZZi/pWtaJ9qmk="/><input type="hidden" name="notify_url" value="http://sungang.tunnel.qydev.com/api/ali/pay/notify"/><input type="hidden" name="body" value="艺术圈交易平台商户支付"/><input type="hidden" name="payment_type" value="1"/><input type="hidden" name="out_trade_no" value="LF20171129100754828009"/><input type="hidden" name="partner" value="2088021950995910"/><input type="hidden" name="service" value="create_direct_pay_by_user"/><input type="hidden" name="total_fee" value="1251.0"/><input type="hidden" name="return_url" value="http://sungang.tunnel.qydev.com/alisuccess.html"/><input type="hidden" name="sign_type" value="RSA"/><input type="hidden" name="seller_id" value="2088021950995910"/></form>
  </div>
</template>

<script>
export default {
  name: 'alipay',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    document.forms['alipaysubmit'].submit();
  }

}
</script>
