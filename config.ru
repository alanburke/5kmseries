use Rack::Static, 
  # :urls => [%w[/], "/images", "/scripts", "/styles", "/data"],
 :urls => %w[/],     # match all requests 

# otherwise 404 NotFound
  :root => "dist"

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
