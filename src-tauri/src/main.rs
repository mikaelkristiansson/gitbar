#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;
use tauri::{CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu, PhysicalPosition};

#[tauri::command]
fn set_review_count(app_handle: tauri::AppHandle, count: &str) {
  let mut rev_count = count.to_string();
  rev_count.insert_str(0, " ");
  app_handle
  .tray_handle()
  .set_title(&rev_count)
  .unwrap();
}

fn main() {
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let tray_menu = SystemTrayMenu::new()
    .add_item(quit);
  let system_tray = SystemTray::new()
    .with_title(" - ")
    .with_menu(tray_menu);

  tauri::Builder::default()
    .system_tray(system_tray)
    .on_system_tray_event(move |app, event| match event {
      SystemTrayEvent::LeftClick {
          position,
          size,
          ..
      } => {
        let w = app.get_window("main").unwrap();
        let window_size  = w.outer_size().unwrap();
        let physical_pos = PhysicalPosition {
          x: position.x as i32 + (size.width as i32 / 2) - (window_size.width as i32 / 2),
          y: position.y as i32 - window_size.height as i32
        };

        let _ = w.set_position(tauri::Position::Physical(physical_pos));

        w.show().unwrap();
        w.set_focus().unwrap();
      }
      SystemTrayEvent::RightClick {
          position: _,
          size: _,
          ..
      } => {
          println!("system tray received a right click");
      }
      SystemTrayEvent::DoubleClick {
          position: _,
          size: _,
          ..
      } => {
          println!("system tray received a double click");
      }
      SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
          "quit" => {
              std::process::exit(0);
          }
          _ => {}
      },
      _ => {}
    })
    .on_window_event(|event| match event.event() {
      tauri::WindowEvent::CloseRequested { api, .. } => {
          // don't kill the app when the user clicks close. this is important
          event.window().hide().unwrap();
          api.prevent_close();
      }
      tauri::WindowEvent::Focused(false) => {
          // hide the window automaticall when the user
          // clicks out. this is for a matter of taste.
          event.window().hide().unwrap();
      }
      _ => {}
    })
    .invoke_handler(tauri::generate_handler![
      set_review_count
    ])
    .setup(|app| {
      // don't show on the taskbar/springboard
      #[cfg(target_os = "macos")]
      app.set_activation_policy(tauri::ActivationPolicy::Accessory);

      let window = app.get_window("main").unwrap();

      // this is a workaround for the window to always show in current workspace.
      // see https://github.com/tauri-apps/tauri/issues/2801
      window.set_always_on_top(true).unwrap();

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
