use Rack::Static, 
  :root => "dist",
  :urls => ["/images", "/scripts", "/styles", "/data" , "/favicon.ico" , "/"],
  :index => "index.html",
  :try => ['index.html', '/index.html'] # try these postfixes sequentially


run lambda { |env|
  [
    200, 
    {
      'Content-Type'  => 'text/html', 
      'Cache-Control' => 'public, max-age=86400' 
    },
    File.open('dist/index.html', File::RDONLY)
  ]
}
