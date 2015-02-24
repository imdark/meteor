$ErrorActionPreference = "Stop"
$script_path = (split-path -parent $MyInvocation.MyCommand.Definition) + "\"
$conf_path = $script_path + "wix-installer\WiXInstaller\Configuration.wxi"

If ($Args.Count -ne 1) {
  echo "Usage:"
  echo "build-installer.ps1 <METEOR RELEASE>"
  echo "The bootstrap tarball url will be compiled into the installer binary based on the Meteor release string."
  echo ""
  exit 1
}

echo "Compiling InstallMeteor"
echo ("Bootstrap tarball version " + $Args[0])

# Set the version
$version = $Args[0].replace("`n","").replace("`r","")
(Get-Content ($conf_path + "_")) | Foreach-Object {$_ -replace '__METEOR_RELEASE__',$version} | Out-File ($conf_path)

Invoke-Expression ($script_path + "wix-installer\build.bat") || exit 1
rm $conf_path
echo "Done"

