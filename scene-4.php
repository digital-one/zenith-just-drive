<?php
if($_GET):
$tax = $_GET['tax'];
$age = $_GET['age'];
$car = $_GET['car'];
//calculations here
endif;
?>

<!doctype html>
<html class="no-js page-home logged ">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        <!-- Place favicon.ico and apple-touch-icon(s) in the root directory -->
        <link rel="stylesheet" href="css/layout.css">
                <script src="js/modernizr.js"></script>
        <!--[if lte IE 9]>
            <link rel="stylesheet" href="/css/ie.css">
            <script src="/js/vendor/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>
        <div id="content">
<div id="container" class="scene-4 preload"  style="background-image: url('images/bg-scene-4.jpg');">
      &nbsp;
    <div id="sun"></div>
    <div id="deer" class="preload" style="background-image: url('images/deer.png');"></div>
   <div id="hills-scene-4" class="preload"  style="background-image: url('images/scene-4-hills.png');"></div>
    <h1>Here's your rough estimate&hellip;</h1>
    <div class="big-cloud preload" style="background-image: url('images/big-cloud.png');"></div>
    <div class="big-cloud right"></div>

    <div id="poster-tree">
         <div id="poster">
            <header>
<span class="left">
tax=<?php echo $tax ?><br />
age=<?php echo $car ?><br />
car=<?php echo $car ?><br />
    a large family car<br />
for someone 35-44<br />
and paying 40% tax</span>
<span class="right">
Contract term: 24 months
Annual mileage: 18,000
</pan>
            </header>
            <div id="main" role="main">
                <p><span class="left"><span class="label">Monthly gross salary sacrifice:</span><a  class="tooltip-btn"><img src="images/tooltip-btn.png" /></a></span><span class="right">&pound;390.00</span><span class="tooltip preload"  style="background-image: url('images/tooltip-1.png');">The amount you ‘sacrifice’ from your monthly salary</span></p>
<p><span class="left"><span class="label">National Insurance saved on salary:</span><a class="tooltip-btn"><img src="images/tooltip-btn.png" /></a></span><span class="right">-&pound;46.80</span><span class="tooltip preload" style="background-image: url('images/tooltip-2.png');">How much less National Insurance you’ll pay each month</span></p>
<p><span class="left"><span class="label">Tax saved on salary:</span><a  class="tooltip-btn"><img src="images/tooltip-btn.png" /></a></span><span class="right">-&pound;78.00</span><span class="tooltip preload"  style="background-image: url('images/tooltip-3.png');">How much less Income Tax you’ll pay each month</span></p>
<p><span class="left"><span class="label">Monthly BIK:</span><a  class="tooltip-btn"><img src="images/tooltip-btn.png" /></a></span><span class="right">&pound;39.15</span><span class="tooltip preload" style="background-image: url('images/tooltip-4.png');">Benefit-In-Kind Tax you’ll pay each month</span></p>
</div>
            <footer><p><span class="left">Net monthly cost</span><span class="right">&pound;304.35</span></p></footer>

<img src="images/poster.png" />

         </div>
    <img src="images/poster-tree.png" class="trunk" />
</div>
<div id="sign-off">
<h2>That's<br />quite a saving!</h2>
<h3>There's more good news&hellip;</h3>
</div>
<a href="scene-5.html" id="show-me-sign" class="preload history" style="background-image: url('images/show-me-sign.png');">Show me</a>
   </div>
</div>
<script  src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script type="text/javascript" src="js/jquery-1.10.1.min.js"><\/script>')</script>
<script src="js/jquery.history.js"></script>
<script src="js/scripts.js"></script>
    </body>
    </html>