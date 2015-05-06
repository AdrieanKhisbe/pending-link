/*
    Data for tests
 */
module.exports = {

  valid_links :[
    {"type":"link","url":"toto://totoun","timestamp":1426511092472,"archived":false,"comment":null,"tags":[],"id":0},
    {"type":"link","url":"toto://titideux","timestamp":1426511092444,"archived":false,"comment":null,"tags":[],"id":42},
    {"type":"link","url":"toto://tototrois","timestamp":1426511083472,"archived":false,"comment":null,"tags":[],"id":282}
  ],

  valid_link_request: {url:"http://tototo"  },
  valid_link_request_with_comment_and_tag: {url:"http://titi", comment: "lol", tags:["hehe", "haha"]  },
  empty_link_request: "",
  invalid_link_request: {junk:"big junk"  },

  valid_link_update:{"type":"link","url":"http://tititi","timestamp":1426511092472,"archived":false,"comment":null,"tags":[],"id":0},
  invalid_link_update:{
    empty_doc : {},
    no_id: {"type":"link","url":"tototo","timestamp":1426511092472,"archived":false,"comment":null,"tags":[]},
    no_url: {"type":"link","timestamp":1426511092472,"archived":false,"comment":null,"tags":[],"id":0},
    no_type: {"url":"tototo","timestamp":1426511092472,"archived":false,"comment":null,"tags":[],"id":0}

  },

  valid_link_partial_update: {tags:["abc"]}

};
