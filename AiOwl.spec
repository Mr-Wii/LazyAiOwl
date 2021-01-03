# -*- mode: python ; coding: utf-8 -*-

block_cipher = None


a = Analysis(['AiOwl.py'],
             pathex=['C:\\Users\\Wael\\Documents\\GitHub\\LazyAiOwl'],
             binaries=[],
             datas=[('C:\\Users\\Wael\\Documents\\GitHub\\LazyAiOwl\\venv\\lib\\site-packages\\eel\\eel.js', 'eel'), ('build', 'build')],
             hiddenimports=['bottle_websocket'],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          [],
          exclude_binaries=True,
          name='AiOwl',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          console=True )
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=True,
               upx_exclude=[],
               name='AiOwl')
