<?php
ini_set('max_execution_time', 300);
date_default_timezone_set('Africa/Nairobi');
$SERVICEID = "100430000";
$spId = '100430';//107015
$password = 'Test123$%';
                 
                 
echo $timestamp = date("YmdHis");//yyyyMMddHHmmss
echo $real_pass = base64_encode(hash('sha256', $spId . "" . $password . "" . $timestamp));
$rand = rand(123456, 654321);
$shortcode="965600";
$originId = $shortcode . "_ECL_" . $rand;
$reqTime = date('Y-m-d') . "T" . date('H:i:s') . ".0000521Z";

$curlData = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ns1=\"http://api-v1.gen.mm.vodafone.com/mminterface/request\" xmlns:ns2=\"http://www.huawei.com.cn/schema/common/v2_1\">
    <soapenv:Header>
        <ns2:RequestSOAPHeader>
            <ns2:spId>$spId</ns2:spId>
            <ns2:spPassword>$real_pass</ns2:spPassword>
            <ns2:serviceId>$SERVICEID</ns2:serviceId>
            <ns2:timeStamp>$timestamp</ns2:timeStamp>
        </ns2:RequestSOAPHeader>
    </soapenv:Header>
    <soapenv:Body>
        <ns1:RequestMsg><![CDATA[<?xml version='1.0' encoding='UTF-8'?><request xmlns='http://api-v1.gen.mm.vodafone.com/mminterface/request'>
<Transaction>
 <CommandID>RegisterURL</CommandID>
 <LanguageCode>0</LanguageCode>
 <OriginatorConversationID>$originId</OriginatorConversationID>
 
<Parameters>
<Parameter>
 <Key>ResponseType</Key>
 <Value>Completed</Value>
</Parameter>
</Parameters>
<ReferenceData>
 <ReferenceItem>
  <Key>ValidationURL</Key>
  <Value>http://195.42.142.18:80/pesa/</Value>
 </ReferenceItem>
 <ReferenceItem>
  <Key>ConfirmationURL</Key>
  <Value>http://195.42.142.18:80/pesa/</Value>
 </ReferenceItem>
 </ReferenceData>
</Transaction>
<Identity>
 <Caller>
  <CallerType>0</CallerType>
  <ThirdPartyID/>
  <Password/>
  <CheckSum/>
  <ResultURL>https://198.12.159.194:443/MPESA/</ResultURL>
 </Caller>
 <Initiator>
  <IdentifierType>1</IdentifierType>
  <Identifier/>
  <SecurityCredential/>
  <ShortCode/>
 </Initiator>
  <PrimaryParty>
   <IdentifierType>1</IdentifierType>
   <Identifier/>
   <ShortCode>$shortcode</ShortCode>
  </PrimaryParty>
 </Identity>
  <KeyOwner>1</KeyOwner>
 </request>]]></ns1:RequestMsg>
    </soapenv:Body></soapenv:Envelope>";
    //echo "<hr>".$curlData."<hr>";
//echo date('Y-m-d H:i:s') . ': Request: ' . $curlData . "\n\n";
//$url = 'http://196.201.214.136:8310/mminterface/request';
//$url = 'https://196.201.214.136:18423/mminterface/request';
$url = "http://portal.safaricom.com/registerURL";



echo $curlData;
echo "<hr> RESPONSE: ";


$response=submitRequest($url,$curlData,array(
    'SOAPAction:""',
    'Content-Type: text/xml; charset=utf-8',
));
echo "<hr>";

 //$response;
 echo $response;






    function submitRequest($url,$post_string,$headers){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_POST,TRUE);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS,  $post_string);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
       
         $data = curl_exec($ch);
        if($data === FALSE)
        {
            $err = 'Curl error: ' . curl_error($ch);
            curl_close($ch);
            echo "Error \n".$err;
        }
        else
        {
            curl_close($ch);
            $body = $data;
           
        }
        return $body;
}