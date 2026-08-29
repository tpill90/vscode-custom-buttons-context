$env:envvar = "envvar"
$script:scopedVariable = "scoped"
$variable = "regular variable"

# Using special builtin variable
Set-Location $PSScriptRoot

$number = 12345
function Set-TempFunction([string] $param)
{
    if ($param -eq $false)
    {
        return
    }
}

Set-TempFunction