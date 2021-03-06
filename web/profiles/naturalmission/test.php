<?php
use Drupal\user\Entity\User;
use Drupal\node\Entity\Node;
use Drupal\user\RoleInterface;
use Drupal\shortcut\Entity\Shortcut;
$json = '[{"nid":[{"value":"1"}],"uuid":[{"value":"a85479ab-8eff-4b2b-8f3d-23d850f51c41"}],"vid":[{"value":"1"}],"langcode":[{"value":"en"}],"type":[{"target_id":"home_page","target_type":"node_type","target_uuid":"53051c11-a812-4fd4-898f-22f590717e21"}],"title":[{"value":"Home page"}],"uid":[{"target_id":"1","target_type":"user","target_uuid":"b923bbd0-997c-4f8b-9d18-b24d1c7e621a","url":"\\/user\\/1"}],"status":[{"value":"1"}],"created":[{"value":"1475079947"}],"changed":[{"value":"1475080832"}],"promote":[{"value":"0"}],"sticky":[{"value":"0"}],"revision_timestamp":[{"value":"1475080004"}],"revision_uid":[{"target_id":"1","target_type":"user","target_uuid":"b923bbd0-997c-4f8b-9d18-b24d1c7e621a","url":"\\/user\\/1"}],"revision_log":[],"revision_translation_affected":[{"value":"1"}],"default_langcode":[{"value":"1"}],"path":[],"field_home_page_about_links":[{"target_id":"1","target_revision_id":"1","target_type":"paragraph","target_uuid":"ab58e117-3eac-48ef-9cd5-16385aec8024"},{"target_id":"2","target_revision_id":"2","target_type":"paragraph","target_uuid":"e2ef41e3-abd4-4b46-aaa8-00558a322f71"},{"target_id":"3","target_revision_id":"3","target_type":"paragraph","target_uuid":"977bb47d-abf5-4906-bd8d-4d4100344f59"}],"field_home_page_about_text":[{"value":"<p>Hi, my name is Heidi Melville. I am 31 years young! I am a qualified naturopath who lives out a healthy active nutritious lifestyle. Since September 2012 I\'ve been a mix of mainly vegan, and vegitarian. Experimenting with High Carb Raw Vegan(80\\/10\\/10), paleo vegan, ovo-vegetarian (one who eats eggs as well as plant based foods). I LOVE to eat well...it makes me happy! My diet and health hasn\'t always been happy, peachy, full of organic goodness and more... Why am I sharing all about my diet history? Because my heart is to live what I preach. The people I look up to the most and aspire to be like a those that live it! They truly are healthy and content through and through! It would be a pleasure to help and assist you on your health journey conquoring your health struggles and challenges!<\\/p>\\r\\n","format":"basic_html"}],"field_home_page_address":[{"value":"Some Street\\r\\nMission Beach\\r\\nQueensland"}],"field_home_page_email":[{"value":"heidi@naturalmission.com"}],"field_home_page_phone":[{"value":"+61401556875"}],"field_home_page_profile_picture":[{"target_id":"1","alt":"","title":"","width":"604","height":"402","target_type":"file","target_uuid":"a4754856-cf80-43d2-a727-560d5b80be9f","url":"http:\\/\\/localhost:9000\\/sites\\/default\\/files\\/2016-09\\/Upbringing.jpg"}],"field_home_page_resource_links":[],"field_home_page_skype":[{"value":"a.beautiful.rainbow"}]}]';
$result = json_decode($json, true);

$node = Node::create([
  'type' => 'home_page',
  'title' => 'Home page',
  'uid' => 0,
  'field_home_page_about_text' => $result[0]['field_home_page_about_text'][0],
  'field_home_page_skype' => $result[0]['field_home_page_skype'][0],
  'field_home_page_email' => $result[0]['field_home_page_email'][0],
  'field_home_page_phone' => $result[0]['field_home_page_phone'][0],
  'field_home_page_address' => $result[0]['field_home_page_address'][0],
]);

$node->save();
