#!/bin/bash
set -euo pipefail
SRC=/workspace/artifacts/imagine_images
DST=/workspace/public/food
mkdir -p "$DST"

pack() {
  local id="$1" name="$2"
  ffmpeg -y -i "$SRC/${id}.jpg" \
    -vf "scale=480:640" \
    -c:v libwebp -quality 72 -compression_level 4 \
    "$DST/${name}.webp" </dev/null >/dev/null 2>&1
  echo "$name"
}

# Pizzas
pack a6967872-86ae-45ad-8e00-6b6740f76ef7 cheese-pizza &
pack ecb07ab0-7e07-4520-9bed-28cf671bb6ec pepperoni-pizza &
pack 0a22d5ba-39dc-400e-b3f0-fcd83a5a1e34 sausage-pizza &
pack d67442d1-55e2-4ee3-8c89-8c7d919354c4 beef-pizza &
pack 86c44160-2b04-491a-885f-e7de77ad5139 ham-pizza &
pack 2e2142a9-f546-4d4b-9490-d29a4d7debdd bacon-pizza &
pack fac7b7f8-a063-428c-bb90-9e94ac4accb2 mushroom-pizza &
pack a01b9678-69b1-4965-81d2-8185cb793b61 peppers-pizza &
pack 014a7cf7-683b-4495-94b2-58de5d2ed5b3 olive-pizza &
pack c7ef0b26-a02d-48ad-8471-3959a4be4185 onion-pizza &
pack e5c38c05-48c0-4bb2-a07b-bc2dc55ba5bb spinach-pizza &
pack ae3507a5-3770-4ef7-909d-135e016b89c9 broccoli-pizza &
pack 2496fcc2-db69-415d-b258-d116080839e6 white-pizza &
pack d7f28395-ea67-4f70-9a15-f035050c72f9 buffalo-chicken-pizza &
pack c2df1095-01dc-43d7-a1e8-9d4a5c82560b bbq-chicken-pizza &
pack f3536c04-2f60-43ca-b2ff-679576d0a3ec greek-pizza &
pack 51604a1f-b64a-4b7c-8852-926c07527f2d hawaiian-pizza &
pack 8b56a7b0-50aa-41f4-b0a8-a43dd5cc0ccd veggie-pizza &
pack 81030cad-da33-414e-bc2a-f2846363243e meat-lovers-pizza &
pack c47cf4b9-2716-4b44-b514-3ce0d61c35db mexicana-pizza &
pack e3c24a97-b0f8-4291-804c-0881e0c2f4fb chicken-pizza &
pack c900d533-d01b-4c8a-b761-fd7f6f530798 italian-pizza &
pack 30d8df33-905c-46b0-a041-04ac548e7073 cbr-pizza &

# Apps / wings
pack ad489ed3-50d6-4409-b538-11577710f9f8 fries &
pack 72b7a3f4-b7e0-431b-8e19-daaaecea6fd3 curly-fries &
pack daa2fd7d-8579-47ac-adbb-363d2452521e onion-rings &
pack 1162d31a-41e6-4846-bb46-c87b90c94328 cheese-fries &
pack fdf8ca87-2ae9-46b2-9769-7482063714d2 mozz-sticks &
pack 937c7820-fd8f-43c9-91d1-060fbaa354c6 poppers &
pack 0d742744-8130-4016-8b7c-177a9ad37930 loaded-fries &
pack 41eb40d1-610d-4446-b98a-3a470d137d50 tenders &
pack f7649025-3da5-4841-8eef-70a4314c0fc4 buffalo-tenders &
pack ad94d82d-6662-49f6-b286-37b4c1d4e9cb pizza-bread &
pack 47b2a18d-b53d-480c-b098-8c9c9efaf40c wings &
pack a821561a-4afb-44cc-beb5-18255e0f7bce nuggets &

# Salads / sides
pack 2e5b6d2f-9609-443a-bf5c-bf54337f341a tossed-salad &
pack 883de31b-c08f-406f-ab22-fb015215faae caesar-salad &
pack 4c36d5d9-c967-4157-8135-5b913110a2a4 greek-salad &
pack e0cc1344-be79-4df9-a864-beb909781d85 antipasto &
pack f1fbdfd9-b8eb-444f-a089-27f1d8cc2e13 chef-salad &
pack 29f0f0a8-930f-4f2a-b6bf-d41c4eb7097c tuna-salad &
pack 12933159-9137-4512-aadf-37467b57f8dd chicken-caesar &
pack 357d33c4-9eef-4265-886a-5ec221f3fd26 meatballs &
pack bf4d64f3-1133-48e1-afb5-df563fef52f7 garlic-bread &
pack 02394b33-11b7-4f9c-9a9a-68e76d716208 cheesy-garlic-bread &
pack 0fb929c7-233a-4009-b6c5-dcf2f7438df5 sausage-link &
pack 9337b26d-efdd-4c88-a8aa-af03c21d1558 pasta-marinara &

# Turnovers / sandwiches
pack cba3c5c5-359c-48d0-b381-10f54ac1b1b5 stromboli &
pack 19b96941-aeab-4487-afb0-9d42dc27c2ef calzone &
pack bc55438d-f277-45d6-a19a-2c1c2b1a065d panzarotti &
pack b55ff403-2c97-481f-9aee-870b066ee11e turkey-sandwich &
pack e2a6efe8-e4a6-411d-841c-8f7797798a9d ham-sandwich &
pack 2a9cec0b-29be-42dd-b059-475f51df8b6e tuna-sandwich &
pack 18428869-2221-42c1-a3eb-c57a297bbc9b chicken-sandwich &
pack 64bb3035-705e-4228-a0e8-0f4f0ac5bd06 club &
pack dc0670fe-2987-4bf6-90b5-84339a8977f2 blt &

# Subs / steaks
pack cb0c779e-1a76-4f71-b63e-4b174e8bd275 italian-sub &
pack 50f09bd2-a8f4-4220-a9dc-81eb9d1ad778 chicken-parm-sub &
pack f6c85a27-f851-4641-8789-bb75e10eaa33 meatball-sub &
pack abd96d61-f5ff-4105-b397-1dfd4c9ed9b8 sausage-sub &
pack dcf89d21-5783-417f-9c66-68e7afc82ed4 eggplant-sub &
pack f2b9da92-cd87-404b-93d5-4cf2f2f078e1 cheesesteak &
pack 9563708c-f044-4df1-9015-1ef74f951927 chicken-cheesesteak &
pack b757767d-3f0d-4e7c-8eb6-c213bab72f6e pizza-steak &
pack 23eed292-bfcd-4da2-9592-52a7a81e7a9d veggie-sub &

# Burgers / wraps
pack c9de6bcf-166f-4013-affa-a45ac5440c57 hamburger &
pack 8308593e-6c6d-4fba-81c5-f674172e35a6 cheeseburger &
pack 32123720-f20f-4157-957d-6ff1457bf4ea bacon-cheeseburger &
pack c49889c8-1a7c-41c6-819c-f5293415e000 double-cheeseburger &
pack 4abb93c0-a1c8-460b-a077-c3c1d70f4db1 chicken-wrap &
pack 9c798458-5030-4241-b0b9-9d01cd0a898e fajita-wrap &
pack f78f3f8a-0b36-4af0-945c-6ae7b72a2e9e gyro &

# Pasta / dessert / drinks
pack dde758d2-0da5-45b9-b0ed-d0dec079fe8e spaghetti-meatballs &
pack 3f3989b9-86b6-48e2-828a-d0b789da8053 baked-ziti &
pack bcf0a881-a10c-4da6-aabf-081c13a98544 ravioli &
pack a012c045-b660-4b77-855f-95d37ad9bd15 chicken-parm-pasta &
pack a27cadfc-57c1-45d4-8e15-5a221ba721f1 manicotti &
pack 111e0de0-db29-4758-98ba-144603794ff8 spaghetti-clams &
pack ddd76438-d247-4bda-8e17-a03daee30543 cheesecake &
pack 6019d4de-214b-4891-be4d-8dfae4502b96 chocolate-cake &
pack d80e1c94-be60-4daf-a8ca-3d641d5505f4 cannoli &
pack 91539f30-a189-412b-9246-79d413233077 soda &
pack 1e55c2b3-7876-4fb5-be97-d8de556d5550 iced-tea &
pack 45e0f5ba-2195-4c77-bb06-002704843003 apple-juice &

wait
ls -1 "$DST" | wc -l
du -sh "$DST"
