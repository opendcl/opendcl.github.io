//JavaScript utlities used by the OpenDCL documentation files
//
// Copyright 2008 OpenDCL Consortium
// All Rights Reserved


//redirect to framed window if we're not in a frame now
var url = window.location;
var path = url.pathname.split( "/HelpFiles/" )[1];
if( typeof(path) != "undefined" )
{
  if( url == parent.window.location )
  {
    var qs = url.search.substr( 1 );
    if( qs.indexOf( "noframes=1" ) < 0 )
    { //if noframes=1 is found in query string, skip the redirect
      var lang = path.split( "/" )[0];
      if( typeof(lang) != "undefined" )
      {
        var newurl = url.href.split( "/HelpFiles/" )[0] + "/HelpFiles/index.php?";
        newurl += "lang=" + escape( lang );
        var page = path.substr( lang.length + 1 );
        if( page )
          newurl += "&page=" + escape( page );
        if( qs )
          newurl += "&" + qs;
        if( url.hash )
          newurl += '&hash=' + url.hash.substr( 1 );
        window.location.replace( newurl );
      }
    }
  }
}