# Update
echo "1. Pulling from Github"
git pull

# Build
echo "2. Building with pdflatex"
makeindex emc2020.idx
bibtex emc2020.aux
makeglossaries emc2020
pdflatex -synctex=1 -interaction=nonstopmode "emc2020".tex

# Copy to server directory
echo "3. Copying static files to server static directory"
cp emc2020.pdf /var/www/studentslovetoparty/emc/$1.pdf # export BASEDIR=/var/www/examplecom/math
